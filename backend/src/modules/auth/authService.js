import dotenv from 'dotenv';
import { DB_CONNECTION_KEY } from '../../libs/connection';
import * as utils from '../../libs/utils';
import * as authValidation from "../auth/authValidations";
import UserService from "../users/userService";
import jwt from 'jsonwebtoken';
import {config} from "../../../../frontend/src/config";

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
			throw {status: 400, msg: 'Bylo nalezeno více uživatelů'};
		}
		if (result.length === 0 || !utils.verifyHash(password, user.password)) {
			throw {status: 404, msg: `Chybný email nebo heslo`};
		}
		if (!user.verified) {
			throw {status: 403, msg: `Email nebyl potvrzen`};
		}
		const token = jwt.sign({ id_user: user.id_user }, env.JWT_SECRET);
		return { user: {id_user: user.id_user, email: user.email}, token: token};
	}

	async confirmEmail(id_user, hash){
		const user_id = Number(id_user);
		const data_hash = Number(hash);
		authValidation.validateConfirmEmailData(user_id, data_hash);
		await this.verifyToken(user_id, data_hash, 'confirm');
		console.log("before verification");
		const result = await this.dbConnection.query('UPDATE users SET verified=true WHERE id_user=?', user_id);
		console.log("after verification");
		if (result.affectedRows === 0) {
			throw {status: 500, msg: 'Verifikace emailu selhala'};
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
			throw {status: 500, msg: 'Změna hesla se nezdařila'};
		}
	}

	async genConfirmToken(id_user, email){
		const hash = utils.genToken(0, 9);
		const result = await this.dbConnection.query(
			`INSERT INTO tokens (id_token, id_user, hash, validity, type) VALUES (NULL, ?, ?, ?, 'confirm')`,
			[id_user, hash, utils.genValidityDate()]);
		if (result.affectedRows === 0) {
			throw {status: 500, msg: `Generování tokenu pro verifikaci emailu selhalo`};
		}
		const link = `${env.APP_BASE_PATH}/confirmEmail/${id_user}/${hash}`;
		const subject = 'Verifikace emailu';
		const text = `Prosím potvrďte svůj email klikem na následující link: \n ${link}`;
		try {
			await utils.sendEmail(email, subject, text);
		} catch (e) {
			throw {status: 502, msg: 'Nepodařilo se odeslat email pro verifikaci registrovaného emailu'};
		}
	}

	async genResetToken(email){
		authValidation.validateResetLinkData(email);
		const user = await this.dbConnection.query(
			`SELECT id_user FROM users WHERE email=?`, email
		);
		if (user.length === 0) {
			throw {status: 404, msg: 'Email nebyl nalezen v databázi'};
		}
		const hash = utils.genToken(0, 9);
		const result = await this.dbConnection.query(
			`INSERT INTO tokens (id_token, id_user, hash, validity, type) VALUES (NULL, ?, ?, ?, 'reset')`,
			[user[0].id_user, hash, utils.genValidityDate()]);
		if (result.affectedRows === 0) {
			throw {status: 500, msg: `Generování tokenu pro reset hesla selhalo`};
		}
		const link = `${env.APP_BASE_PATH}/resetPassword/${user[0].id_user}/${hash}`;
		const subject = 'Obnovení hesla';
		const text = `Své heslo můžete obnovit klikem na následující odkaz: \n ${link}`;
		try {
			await utils.sendEmail(email, subject, text);
		} catch (e) {
			throw {status: 502, msg: 'Odeslání emailu s odkazem pro obnovení hesla selhalo'};
		}
	}

	async verifyToken(id_user, hash, type){
		const result = await this.dbConnection.query(
			`SELECT id_token, validity FROM tokens WHERE id_user=? AND hash=? AND type=?`,
			[id_user, hash, type]
		);
		if(result.length === 0){
			throw {status: 404, msg: 'Neexistující token'};
		}
		const { validity, id_token } = result[0];
		if(validity < new Date()){
			let part = null;
			if(type === "confirm"){
				part = 'potvrzení emailu';
			} else {
				part = 'obnovení hesla';
			}
			const link = `${env.APP_BASE_PATH}/resendToken/${id_token}/${type}`;
			const message =
				`Platnost tokenu pro ${part} vypršela. Můžete si nechat zaslat nový link kliknutím na následující `;
			throw {status: 498, msg: message, link: link};
		}
		await this.dbConnection.query(`DELETE FROM tokens WHERE id_token=?`, id_token);
	}

	async resendToken(id_token, type){
		const token_id = Number(id_token);
		authValidation.validateResendTokenData(token_id, type);
		let result = await this.dbConnection.query(
			`SELECT users.email as email, users.id_user as id_user FROM tokens 
			JOIN users ON users.id_user=tokens.id_user WHERE tokens.id_token=?`, token_id
		);
		if(result.length === 0){
			throw {status: 404, msg: 'Nebyl nalezen odpovídající záznam v databázi'};
		}
		const { id_user, email } = result[0];
		result = await this.dbConnection.query(
			`DELETE FROM tokens WHERE id_token=?`, token_id
		);
		if(result.affectedRows === 0){
			throw {status: 500, msg: 'Token se nepodařilo smazat'};
		}
		if(type === "confirm") {
			this.genConfirmToken(id_user, email);
		}
		if(type === "reset") {
			this.genResetToken(email);
		}
	}
}