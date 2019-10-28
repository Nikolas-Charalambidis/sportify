import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as userValidation from './userValidations';
import { genConfirmToken } from '../../libs/utils';

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
		if(await this.isEmailUsed(email)){
			throw {status: 400, msg: 'Email already exists'};
		}
		const result = await this.dbConnection.query(
			'INSERT INTO users (id_user, email, password, name, surname, verified) VALUES ("", ?, ?, ?, ?, 0)',
			[email, password, name, surname]
		);
		if(result.affectedRows === 1){
			const hash = await this.genConfirmToken(result.insertId, email);
			await this.sendConfirmEmail(email, result.insertId, hash);
			return result.insertId;
		}
		throw {status: 500, msg: 'Unable to create user'};
	}

	async login(email, password){
		userValidation.validateLoginData(email, password);
		const result = await this.dbConnection.query(
			`SELECT id_user, email, verified FROM users WHERE email=? AND password=?`, [email, password]
		);
		if(result.length === 0){
			throw {status: 400, msg: 'User not found'};
		}
		if(result.length > 1){
			throw {status: 400, msg: 'Returned more than one record'};
		}
		return result[0];
	}

	async confirmEmail(id_user, hash){
		const user_id = Number(id_user);
		userValidation.validateConfirmEmailData(user_id, hash);
		await this.verifyToken(user_id, hash);
		await this.setUserVerified(id_user);
		return await this.findUserById(id_user);
	}

	async genConfirmToken(id_user, email){
		const hash = genConfirmToken(0, 9);
		const validity = new Date();
		validity.setDate(validity.getDate() + 1);

		const result = await this.dbConnection.query(
			`INSERT INTO confirmTokens (id_token, id_user, hash, validity) VALUES ('', ?, ?, ?)`,
			[id_user, hash, validity]);
		return hash;
	}

	async isEmailUsed(email){
		const result = await this.dbConnection.query('SELECT * FROM users WHERE email=?', email);
		return result.length > 0;
	}

	async verifyToken(id_user, hash){
		const result = await this.dbConnection.query(
			`SELECT id_token, validity FROM confirmTokens WHERE id_user=? AND hash=?`, [id_user, hash]
		);
		if(result.length === 0){
			throw {status: 404, msg: 'Invalid token'};
		}
		const { validity } = result[0];
		if(validity < new Date()){
			throw {status: 498, msg: 'Token expired'};
		}
		return result[0];
	}

	async setUserVerified(id_user){
		const result = await this.dbConnection.query('UPDATE users SET verified=true WHERE id_user=?', id_user);
		if(result.affectedRows === 0){
			throw {status: 400, msg: 'Verification failed'};
		}
	}

	async sendConfirmEmail(email, id_user, hash){
		// const link = `http://localhost:3000/confirmEmail/${id_user}/${hash}`
		// let nodemailer = require("nodemailer");
		// const transport = nodemailer.createTransport({
		// 	host: "",
		// 	port: "",
		// 	secure: true
		// });
		// transport.sendMail({
		// 	from: '<admin@sportify.cz>',
		// 	to: `${email}`,
		// 	subject: "Email confirmation",
		// 	text: `Please confirm your email by clicking on this link \n ${link}`,
		// }, console.error);
	}
}