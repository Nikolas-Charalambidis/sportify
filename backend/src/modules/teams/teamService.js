import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as teamValidation from './teamValidations';
import * as utils from "../../libs/utils";

dotenv.config();
dotenv.config({path: '.env'});

export default class TeamService {

	constructor(req) {
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async allTeams() {
		return this.dbConnection.query(
			`SELECT t.id_team, t.name, s.sport, tt.type, CONCAT(u.name, ' ', u.surname) as leader
				FROM teams as t 
				JOIN sports as s ON t.id_sport=s.id_sport 
				JOIN team_types as tt ON tt.id_type=t.id_type 
				JOIN users as u ON t.id_leader=u.id_user`
		);
	}

	async findTeamById(id_team) {
		const team_id = Number(id_team);
		teamValidation.validateTeamID(team_id);
		const result = await this.dbConnection.query(
			`SELECT t.id_team, t.name, s.id_sport, s.sport, t.id_sport, type.id_type, type.type, t.id_leader, t.id_contact_person, t.avatar_url, t.active,
			 CONCAT(leader.name, " ", leader.surname) as leader,
			 CONCAT(contact.name, " ", contact.surname) as contact_person
			FROM teams as t
			JOIN sports as s ON t.id_sport=s.id_sport
			JOIN users as leader ON t.id_leader=leader.id_user
			JOIN users as contact ON t.id_contact_person=contact.id_user
			JOIN team_types as type ON t.id_type=type.id_type
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
			`SELECT u.id_user, u.email, CONCAT(u.name, ' ', u.surname) AS 'name', t.id_position, p.position
			FROM team_membership AS t
   			JOIN users AS u ON t.id_user = u.id_user
   			JOIN positions AS p ON t.id_position = p.id_position
   			WHERE id_team = ? AND t.status='active'`
			, team_id
		);
		return players;
	}

	async addNewTeam(id_sport, name, id_type, id_leader) {
		const sport = Number(id_sport);
		const leader = Number(id_leader);
		const type = Number(id_type);
		teamValidation.validateNewTeamData(sport, name, type, leader);
		const result = await this.dbConnection.query(
			`INSERT INTO teams (id_team, id_sport, name, id_type, id_leader, id_contact_person, active) VALUES (NULL, ?, ?, ?, ?, ?, true)`,
			[sport, name, type, leader, leader]
		);
		if(result.affectedRows === 1){
			return result.insertId;
		}
		throw {status: 500, msg: 'Vytvoření nového týmu se nezdařilo'};
	}

	async changeTeam(id_team, name, id_type, id_sport, id_contact_person, id_leader) {
		const team = Number(id_team);
		const sport = Number(id_sport);
		const contact_person = Number(id_contact_person);
		const leader = Number(id_leader);
		const type = Number(id_type);
		teamValidation.validateChangeTeamData(team, name, type, sport, contact_person, leader);
		const result = await this.dbConnection.query(
			`UPDATE teams SET name=?, id_type=?, id_sport=?, id_contact_person=?, id_leader=? WHERE id_team=?`,
			[name, type, sport, contact_person, leader, team]
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
			JOIN teams AS t ON cm.id_team = t.id_team
			JOIN competitions AS c ON cm.id_competition = c.id_competition
			JOIN sports AS s ON c.id_sport=s.id_sport
			where cm.id_team = ? AND cm.status='active';`
			, team_id);
	}

	async uploadAvatar(filepath, params, id_team) {
		const team_id = Number(id_team);
		teamValidation.validateTeamID(team_id);
		let result = await this.dbConnection.query(
			`SELECT avatar_public_id FROM teams WHERE id_team=?`, team_id
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

	async setActive(id_team, active) {
		const team_id = Number(id_team);
		teamValidation.validateTeamID(team_id);
		teamValidation.validateSetActive(active);
		const setActive = active ? 1 : 0;

		const result = await this.dbConnection.query(
			`UPDATE teams SET active=? WHERE id_team=?`,
			[setActive, team_id]
		);
		if(result.affectedRows === 1) {
			return result.insertId;
		}
		throw {status: 500, msg: 'De/aktivace týmu se nezdařila'};
	}

	async teamStatistics(id_team) {
		const team_id = Number(id_team);
		teamValidation.validateTeamID(team_id);

		// individual statistics in the team
		const invidividual = await this.dbConnection.query(`SELECT
					ts.id_user,
					CONCAT(u.name, ' ', u.surname) AS 'name_surname',
					tm.id_position,
					p.position,
					p.is_goalkeeper AS 'is_goalkeeper',
					ts.id_team,
					ts.id_competition,
					ts.field_matches,
					ts.field_goals,
					ts.field_assists,
					(ts.field_goals + ts.field_assists) AS 'field_points',
					((ts.field_goals + ts.field_assists)/ts.field_matches) AS 'field_average_points',
					ts.field_suspensions,
					ts.goalkeeper_matches,
					ts.goalkeeper_minutes,
					ts.goalkeeper_goals,
					ts.goalkeeper_zeros,
					(ts.goalkeeper_zeros / ts.goalkeeper_matches) AS 'goalkeeper_average_zeros',
					ts.goalkeeper_shoots,
					CONCAT(100*(1 - ts.goalkeeper_goals/ts.goalkeeper_shoots), ' %') AS 'goalkeeper_success_rate'
				FROM team_statistics as ts	
				JOIN users AS u ON ts.id_user = u.id_user
				JOIN team_membership AS tm on u.id_user = tm.id_user
				JOIN positions AS p on tm.id_position = p.id_position
				WHERE ts.id_team=?`
			, team_id);

		// overall aggregate statistics in the team of all the competitions (except null ones which are of free time)
		const competitions_aggregate = await this.dbConnection.query(`SELECT
					ts.id_user,
					CONCAT(u.name, ' ', u.surname) AS 'name_surname',
					MAX(p.position) AS 'position',
					MAX(p.is_goalkeeper) AS 'is_goalkeeper',
					SUM(ts.field_matches) AS 'matches',
					SUM(ts.field_goals) AS 'goals',
					SUM(ts.field_assists) AS 'assists',
					(SUM(ts.field_goals) + SUM(ts.field_assists)) AS 'field_points',
					((SUM(ts.field_goals) + SUM(ts.field_assists))/SUM(ts.field_matches)) AS 'field_average_points',
					SUM(ts.field_suspensions) AS 'suspensions',
					SUM(ts.goalkeeper_matches) AS 'goalkeeper_matches',
					SUM(ts.goalkeeper_minutes) AS 'goalkeeper_minutes',
					SUM(ts.goalkeeper_goals) AS 'goalkeeper_goals',
					SUM(ts.goalkeeper_zeros) AS 'goalkeeper_zeros',
					(SUM(ts.goalkeeper_zeros)/SUM(ts.goalkeeper_matches)) AS 'goalkeeper_average_zeros',
					SUM(ts.goalkeeper_shoots) AS 'goalkeeper_shoots',
					CONCAT(100*(1 - SUM(ts.goalkeeper_goals)/SUM(ts.goalkeeper_shoots)), ' %') AS 'goalkeeper_success_rate'
						FROM team_statistics as ts
						JOIN users AS u ON ts.id_user = u.id_user
						JOIN team_membership tm on u.id_user = tm.id_user
						JOIN positions AS p on tm.id_position = p.id_position
						WHERE ts.id_team=? AND id_competition IS NOT null
						GROUP BY ts.id_user`
			, team_id);
		return {individual: invidividual, competitions_aggregate: competitions_aggregate};
	}

	async getMatchesByTeam(id_team){
		const team_id = Number(id_team);
		teamValidation.validateTeamID(team_id);
		return this.dbConnection.query(
			`SELECT 
				m.id_match, m.date,
				host.name AS host_name, guest.name AS guest_name,
				c.name AS competition_name
			 FROM matches as m
			 LEFT JOIN competitions as c ON m.id_competition=c.id_competition 
			 JOIN teams as host ON m.id_host=host.id_team 
			 JOIN teams as guest ON m.id_guest=guest.id_team
			 WHERE m.id_host=? OR m.id_guest=?`,
			[team_id, team_id]
		);
	}
}
