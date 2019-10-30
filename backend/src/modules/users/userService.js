import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as userValidation from './userValidations';
import AuthService from "../auth/authService";
import {hash} from '../../libs/utils';

dotenv.config();
dotenv.config({path: '.env'});

export default class UserService {

	constructor(req) {
		this.req = req;
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async allUsers() {
		return this.dbConnection.query(`SELECT * FROM users`);
	}

	async findUserById(id_user) {
		const user_id = Number(id_user);
		userValidation.validateUserID(user_id);
		const result = await this.dbConnection.query('SELECT * FROM users WHERE id_user=?', user_id);
		if (result.length === 0) {
			throw {status: 404, msg: 'User not found'};
		}
		return result[0];
	}

	async addNewUser(email, password, name, surname) {
		userValidation.validateNewUserData(email, password, name, surname);
		userValidation.validateEmail(email);
		if (await this.isEmailUsed(email)) {
			throw {status: 400, msg: 'Email already exists'};
		}

		const hashedPassword = hash(password, 10);
		const result = await this.dbConnection.query(
			'INSERT INTO users (id_user, email, password, name, surname, verified) VALUES ("", ?, ?, ?, ?, 0)',
			[email, hashedPassword, name, surname]
		);
		if (result.affectedRows === 1) {
			const authService = await AuthService(this.req);
			const hash = await authService.genConfirmToken(result.insertId);
			await authService.sendConfirmEmail(email, result.insertId, hash);
			return result.insertId;
		}
		throw {status: 500, msg: 'Unable to create user'};
	}

	async isEmailUsed(email) {
		const result = await this.dbConnection.query('SELECT * FROM users WHERE email=?', email);
		return result.length > 0;
	}

	async setUserVerified(id_user) {
		const result = await this.dbConnection.query('UPDATE users SET verified=true WHERE id_user=?', id_user);
		if (result.affectedRows === 0) {
			throw {status: 400, msg: 'Verification failed'};
		}
	}
}