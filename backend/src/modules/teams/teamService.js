import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as teamValidation from './teamValidations';
import * as userValidation from "../users/userValidations";
import * as utils from "../../libs/utils";

dotenv.config();
dotenv.config({path: '.env'});

export default class TeamService {

	constructor(req) {
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async allTeams() {
		return this.dbConnection.query(
			`SELECT t.id_team, t.name, s.sport, CONCAT(u.name, ' ', u.surname) as leader
				FROM teams as t 
				JOIN sports as s ON t.id_sport=s.id_sport 
				JOIN users as u ON t.id_leader=u.id_user`
		);
	}

	async findTeamById(id_team) {
		const team_id = Number(id_team);
		teamValidation.validateTeamID(team_id);
		const result = await this.dbConnection.query(
			`SELECT t.id_team, t.name, s.id_sport, s.sport, t.id_sport, t.type, t.id_leader, CONCAT(u.name, " ", u.surname) as leader, t.avatar_url as avatar
			FROM teams as t
			JOIN sports as s ON t.id_sport=s.id_sport
			JOIN users as u ON t.id_leader=u.id_user
			WHERE id_team=?`
			, team_id
		);
		if (result.length === 0) {
			throw {status: 404, msg: 'Tým nebyl nalezen v databázi'};
		}
		return result[0];
	}

	async findPlayersByTeamId(id_team) {
		const team_id = Number(id_team);
		teamValidation.validateTeamID(team_id);
		const players = await this.dbConnection.query(
			`SELECT u.id_user, u.email, u.name, u.surname, t.position FROM team_membership AS t
   			JOIN users u ON t.user = u.id_user
   			WHERE team = ?;`
			, team_id
		);
		return players;
	}

	async addNewTeam(id_sport, name, type, id_leader) {
		const sport = Number(id_sport);
		const leader = Number(id_leader);
		teamValidation.validateNewTeamData(sport, name, type, leader);
		const result = await this.dbConnection.query(
			`INSERT INTO teams (id_team, id_sport, name, type, id_leader, id_contact_person) VALUES (NULL, ?, ?, ?, ?, ?)`,
			[sport, name, type, leader, leader]
		);
		if(result.affectedRows === 1){
			return result.insertId;
		}
		throw {status: 500, msg: 'Vytvoření nového týmu se nezdařilo'};
	}

	async changeTeam(id_team, name, type, id_sport, id_contact_person) {
		const team_id = Number(id_team);
		const sport_id = Number(id_sport);
		const contact_person_id = Number(id_contact_person);
		teamValidation.validateChangeTeamData(team_id, name, type, sport_id, contact_person_id);
		const result = await this.dbConnection.query(
			`UPDATE teams SET name=?, type=?, id_sport=?, id_contact_person=? WHERE id_team=?`,
			[name, type, sport_id, contact_person_id, team_id]
		);
		if(result.affectedRows === 1){
			return result.insertId;
		}
		throw {status: 500, msg: 'Změna týmových údajů se nezdařila'};
	}

	async teamCompetitionMemberships(id_team) {
		const team_id = Number(id_team);
		teamValidation.validateTeamID(team_id);
		return this.dbConnection.query(`SELECT 
				t.id_team, 
				t.name as 'team_name', 
				2 as 'team_position', 
				s.id_sport, 
				s.sport, 
				c.id_competition, 
				c.name as 'competition_name', 
				c.avatar_url,
				c.start_date, 
				c.end_date, 
				(c.start_date < DATE(NOW()) AND c.end_date > DATE(NOW())) as 'is_active' 
			FROM competition_membership AS cm
			JOIN teams t ON cm.team = t.id_team
			JOIN competitions AS c ON cm.competition = c.id_competition
			JOIN sports AS s ON t.id_sport=s.id_sport
			where cm.team = ? AND cm.status='active';`
			, team_id);
	}

	async uploadAvatar(filepath, params, id_team) {
		const team_id = Number(id_team);
		teamValidation.validateTeamID(team_id);

		let result = await this.dbConnection.query(
			`SELECT avatar_public_id FROM users WHERE id_team=?`, team_id
		);
		if(result.length === 0) {
			throw {status: 404, msg: 'Team nebyl nalezen v databázi'};
		}
		const { avatar_public_id } = result[0];
		if(avatar_public_id !== null) {
			await utils.deleteAvatarFromCloudinary(avatar_public_id);
		}
		const {url, public_id} = await utils.uploadAvatarToCloudinary(filepath, params);
		result = await this.dbConnection.query(
			`UPDATE teams SET avatar_url=?, avatar_public_id=? WHERE id_team=?`,
			[url, public_id, team_id]
		);
		if (result.affectedRows === 0) {
			throw {status: 500, msg: 'Informace o avatarovi se nepodařilo uložit do databáze'};
		}
		return url;
	}
	async getAvatar(id_team) {
		const team_id = Number(id_team);
		teamValidation.validateTeamID(team_id);

		const result = await this.dbConnection.query(
			`SELECT avatar_url FROM teams WHERE id_team=?`, team_id
		);
		if(result.length === 0) {
			throw {status: 404, msg: 'Team nebyl nalezen v databázi'};
		}
		const { avatar_url } = result[0];
		return avatar_url;
	}
}
