import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as teamValidation from './teamValidations';

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
			`SELECT t.id_team, t.name, s.sport, t.id_sport, t.type, CONCAT(u.name, " ", u.surname) as leader, t.avatar_url as avatar
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
}
