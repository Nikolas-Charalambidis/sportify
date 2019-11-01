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
			`SELECT t.id_team, t.name, s.sport, CONCAT(u.name, " ", u.surname) as leader
			FROM teams as t
			JOIN sports as s ON t.id_sport=s.id_sport
			JOIN users as u ON t.id_leader=u.id_user
			WHERE id_team=?`
			, team_id
		);
		if (result.length === 0) {
			throw {status: 404, msg: 'Team not found'};
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

	async addNewTeam(id_sport, name, id_leader) {
		const sport = Number(id_sport);
		const leader = Number(id_leader);
		teamValidation.validateNewTeamData(sport, name, leader);
		const result = await this.dbConnection.query(
			`INSERT INTO teams (id_team, id_sport, name, id_leader) VALUES (NULL, ?, ?, ?)`,
			[sport, name, leader]
		);
		if(result.affectedRows === 1){
			return result.insertId;
		}
		throw {status: 500, msg: 'Unable to create team'};
	}
}
