import dotenv from 'dotenv';
import { DB_CONNECTION_KEY } from '../../libs/connection';
import * as utils from '../../libs/utils';
import * as authValidation from "../auth/authValidations";
import UserService from "../users/userService";

import jwt from 'jsonwebtoken';
import {verifyHash} from "../../libs/utils";
import {hash} from "../../libs/utils";

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
		const result = await this.dbConnection.query(
			`SELECT id_user, email, verified, password FROM users WHERE email=?`, [email]
		);
		const user = result[0];
		if (result.length > 1) {
			throw {status: 400, msg: 'Returned more than one record'};
		}
		if (result.length === 0 || !utils.verifyHash(password, user.password)) {
			throw {status: 404, msg: `User not found or the password doesn't match`};
		}
		if (!user.verified) {
			throw {status: 403, msg: `Unverified email`};
		}
		const token = jwt.sign({ id_user: user.id_user }, env.JWT_SECRET);
		return { user: {id_user: user.id_user, email: user.email}, token: token};
	}

	async confirmEmail(id_user, hash){
		const user_id = Number(id_user);
		const data_hash = Number(hash);
		authValidation.validateConfirmEmailData(user_id, data_hash);
		await this.verifyToken(user_id, data_hash, 'confirm');

		const result = await this.dbConnection.query('UPDATE users SET verified=true WHERE id_user=?', user_id);
		if (result.affectedRows === 0) {
			throw {status: 400, msg: 'Verification failed'};
		}
		return await new UserService(this.req).findUserById(user_id);
	}

	async resetPassword(id_user, hash, password1, password2){
		const user_id = Number(id_user);
		const data_hash = Number(hash);
		authValidation.validateResetPasswordData(user_id, data_hash, password1, password2);
		await this.verifyToken(user_id, data_hash, 'reset');

		const result = await this.dbConnection.query(
			'UPDATE users SET password=? WHERE id_user=?',
			[utils.hash(password1, 10), user_id]
		);
		if (result.affectedRows === 0) {
			throw {status: 400, msg: 'Password change failed'};
		}
	}

	async genConfirmToken(id_user, email){
		const hash = utils.genToken(0, 9);
		const result = await this.dbConnection.query(
			`INSERT INTO tokens (id_token, id_user, hash, validity, type) VALUES (NULL, ?, ?, ?, 'confirm')`,
			[id_user, hash, utils.genValidityDate()]);
		if (result.affectedRows === 0) {
			throw {status: 500, msg: `Token generating failed`};
		}
		const link = `${env.APP_BASE_PATH}/confirmEmail/${id_user}/${hash}`;
		const subject = 'Email confirmation';
		const text = `Please confirm your email by clicking on this link: \n ${link}`;
		try {
			await utils.sendEmail(email, subject, text);
		} catch (e) {
			throw {status: 502, msg: 'Unable to send confirmation email'};
		}
	}

	async genResetToken(email){
		authValidation.validateResetLinkData(email);
		const user = await this.dbConnection.query(
			`SELECT id_user FROM users WHERE email=?`, email
		);
		if (user.length === 0) {
			throw {status: 404, msg: 'User not found'};
		}
		const hash = utils.genToken(0, 9);
		const result = await this.dbConnection.query(
			`INSERT INTO tokens (id_token, id_user, hash, validity, type) VALUES (NULL, ?, ?, ?, 'reset')`,
			[user[0].id_user, hash, utils.genValidityDate()]);
		if (result.affectedRows === 0) {
			throw {status: 500, msg: `Token generating failed`};
		}
		const link = `${env.APP_BASE_PATH}/resetPassword/${user[0].id_user}/${hash}`;
		const subject = 'Reset password';
		const text = `You can reset your password by clicking on this link: \n ${link}`;
		try {
			await utils.sendEmail(email, subject, text);
		} catch (e) {
			throw {status: 502, msg: 'Unable to send confirmation email'};
		}
	}

	async verifyToken(id_user, hash, type){
		const result = await this.dbConnection.query(
			`SELECT id_token, validity FROM tokens WHERE id_user=? AND hash=? AND type=?`,
			[id_user, hash, type]
		);
		if(result.length === 0){
			throw {status: 404, msg: 'Invalid token'};
		}
		const { validity, id_token } = result[0];
		if(validity < new Date()){
			throw {status: 498, msg: 'Token expired'};
		}
		await this.dbConnection.query(`DELETE FROM tokens WHERE id_token=?`, id_token);
	}
}