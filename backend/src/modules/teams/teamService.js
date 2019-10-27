import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';

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
		return this.dbConnection.query(
			'SELECT t.id_team, t.name, s.sport, CONCAT(u.name, " ", u.surname) as leader ' +
			'FROM teams as t ' +
			'JOIN sports as s ON t.id_sport=s.id_sport ' +
			'JOIN users as u ON t.id_leader=u.id_user ' +
			'WHERE id_team=?'
			, id_team
		);
	}

	async addNewTeam(id_sport, name, id_leader) {
		return this.dbConnection.query(
			'INSERT INTO teams (id_team, id_sport, name, id_leader) VALUES ("", ?, ?, ?)',
			[id_sport, name, id_leader], (err, res) => {
				if (!err) {
					return res.insertId;
				}
			}
		);
	}
}
