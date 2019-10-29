import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';
import { genConfirmToken } from '../../libs/utils';
import { config } from '../../../config';
import * as authValidation from "../auth/authValidations";
import UserService from "../users/userService";

dotenv.config();
dotenv.config({path: '.env'});

export default class AuthService {

	constructor(req) {
		this.req = req;
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async login(email, password){
		authValidation.validateLoginData(email, password);
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
		authValidation.validateConfirmEmailData(user_id, hash);
		await this.verifyToken(user_id, hash);
		await this.setUserVerified(id_user);
		return await new UserService(this.req).findUserById(id_user);
	}

	static async sendConfirmEmail(email, id_user, hash){
		let link = config.LOCAL
			? `http://localhost:3000/confirmEmail/${id_user}/${hash}`
			: `http://sportify.cz/confirmEmail/${id_user}/${hash}`;

		const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(config.SENDGRID_API_KEY);
		const msg = {
			to: `${email}`,
			from: 'admin@sportify.cz',
			subject: 'Email confirmation',
			text: `Please confirm your email by clicking on this link: \n ${link}`,
		};
		await sgMail.send(msg);
	}

	async genConfirmToken(id_user){
		const hash = genConfirmToken(0, 9);
		const validity = new Date();
		validity.setDate(validity.getDate() + 1);

		const result = await this.dbConnection.query(
			`INSERT INTO confirmTokens (id_token, id_user, hash, validity) VALUES ('', ?, ?, ?)`,
			[id_user, hash, validity]);
		return hash;
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
}