import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';

dotenv.config();
dotenv.config({path: '.env'});

export default class UserService {

	constructor(req, res) {
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async allUsers() {
		return this.dbConnection.query(`SELECT * FROM users`);
	}

	async findUserById(id_user) {
		return this.dbConnection.query('SELECT * FROM users WHERE id_user=?', id_user);
	}

	async addNewUser(email, password, name, surname) {
		return this.dbConnection.query(
			'INSERT INTO users (id_user, email, password, name, surname) VALUES ("", ?, ?, ?, ?)',
			[email, password, name, surname], (err, res) => {
				if(!err){
					return res.insertId;
				}
			}
		);
	}

	async isEmailUsed(email){
		const result = await this.dbConnection.query('SELECT * FROM users WHERE email=?', email);
		return result.length > 0;
	}

	async login(email, password){
		return this.dbConnection.query(
			`SELECT id_user FROM users WHERE email=? AND password=? LIMIT 1`, [email, password]
		);
	}
}