import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as userValidation from './userValidations';

dotenv.config();
dotenv.config({path: '.env'});

export default class UserService {

	constructor(req) {
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async allUsers() {
		return this.dbConnection.query(`SELECT * FROM users`);
	}

	async findUserById(id_user) {
		return this.dbConnection.query('SELECT * FROM users WHERE id_user=?', id_user);
	}

	async addNewUser(email, password, name, surname) {
		userValidation.validateNewUserData(email, password, name, surname);
		userValidation.validateEmail(email);
		if(await this.isEmailUsed(email)){
			throw {status: 400, msg: 'Email already exists'};
		}
		const result = await this.dbConnection.query(
			'INSERT INTO users (id_user, email, password, name, surname) VALUES ("", ?, ?, ?, ?)',
			[email, password, name, surname]
		);
		if(result.affectedRows === 1){
			return result.insertId;
		}
		throw {status: 500, msg: 'Unable to create user'};
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

	async changePassword(id_user, password){
		return this.dbConnection.query(
			`UPDATE users SET password=? WHERE id_user=?`, [password, id_user]
		);
	}
}