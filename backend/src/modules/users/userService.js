import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';

dotenv.config();
dotenv.config({path: '.env'});

export default class UserService {

	constructor(req) {
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async allUsers() {
		return await this.dbConnection.query(`SELECT * FROM users`);
	}

	async findUserById(id_user) {
		const id = Number(id_user);
		return await this.dbConnection.query('SELECT * FROM users WHERE id_user=?', id);
	}
}
