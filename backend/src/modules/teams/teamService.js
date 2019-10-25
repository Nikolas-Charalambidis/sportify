import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';

dotenv.config();
dotenv.config({path: '.env'});

export default class TeamService {

	constructor(req) {
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async allTeams() {
		return await this.dbConnection.query(`SELECT * FROM teams`);
	}

	async findTeamById(id_team) {
		const id = Number(id_team);
		return await this.dbConnection.query('SELECT * FROM teams WHERE id_team=?', id);
	}
}
