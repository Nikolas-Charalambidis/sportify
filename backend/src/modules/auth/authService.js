import dotenv from 'dotenv';
import { DB_CONNECTION_KEY } from '../../libs/connection';
import { hash, verifyHash, genConfirmToken } from '../../libs/utils';
import { config } from '../../../config';
import * as authValidation from "../auth/authValidations";
import UserService from "../users/userService";

import jwt from 'jsonwebtoken';

dotenv.config();
dotenv.config({path: '.env'});

const env = process.env;

export default class AuthService {

	constructor(req) {
		this.req = req;
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async login(email, password){
		authValidation.validateLoginData(email, password);
		const user = await this.dbConnection.query(
			`SELECT id_user, email, verified, password FROM users WHERE email=?`, [email]
		);
		if (user.length > 1) {
			throw {status: 400, msg: 'Returned more than one record'};
		}
		if (user.length === 0) {
			throw {status: 404, msg: `User not found or the password doesn't match`};
		}

		const hashedPassword = hash(password, 10);
		const match = verifyHash(user[0].password, hashedPassword);

		if (!match) {
			throw {status: 404, msg: `User not found or the password doesn't match`};
		}

		const id_user = user[0].id_user;
		const token = jwt.sign({ id_user: id_user }, env.JWT_SECRET);
		return { id_user: id_user, token: token};
	}

	async confirmEmail(id_user, hash){
		const user_id = Number(id_user);
		authValidation.validateConfirmEmailData(user_id, hash);
		await this.verifyToken(user_id, hash);

		const userService = new UserService(this.req);
		await userService.setUserVerified(id_user);
		return await userService.findUserById(id_user);
	}

	async sendConfirmEmail(email, id_user, hash){
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
}