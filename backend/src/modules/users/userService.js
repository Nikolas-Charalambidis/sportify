import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as userValidation from './userValidations';
import AuthService from "../auth/authService";
import {hash, verifyHash} from '../../libs/utils';

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

	async addNewUser(email, password1, password2, name, surname) {
		userValidation.validateNewUserData(email, password1, password2, name, surname);
		if (await this.isEmailUsed(email)) {
			throw {status: 400, msg: 'Email already exists'};
		}
		const hashedPassword = hash(password1, 10);
		const result = await this.dbConnection.query(
			`INSERT INTO users (id_user, email, password, name, surname, verified) VALUES (NULL, ?, ?, ?, ?, 0)`,
			[email, hashedPassword, name, surname]
		);
		if (result.affectedRows < 0) {
			throw {status: 500, msg: 'Unable to create user'};
		}
		await new AuthService(this.req).genConfirmToken(result.insertId, email);
		return result.insertId;
	}

	async changePassword(id_user, oldPassword, newPassword1, newPassword2) {
		const user_id = Number(id_user);
		userValidation.validateChangePasswordData(user_id, oldPassword, newPassword1, newPassword2);
		const user = await this.dbConnection.query(
			`SELECT password FROM users WHERE id_user=?`, [user_id]
		);
		if (user.length === 0) {
			throw {status: 404, msg: 'User not found'};
		}
		if(!verifyHash(oldPassword, user[0].password)){
			throw {status: 400, msg: 'Invalid data'};
		}
		const result = await this.dbConnection.query(
			'UPDATE users SET password=? WHERE id_user=?',
			[hash(newPassword1, 10), user_id]
		);
		if (result.affectedRows === 0) {
			throw {status: 400, msg: 'Password change failed'};
		}
	}

	async changeUser(id_user, name, surname) {
		const user_id = Number(id_user);
		userValidation.validateChangeUserData(user_id, name, surname);

		const result = await this.dbConnection.query(
			'UPDATE users SET name=?, surname=? WHERE id_user=?',
			[name, surname, user_id]
		);
		if (result.affectedRows === 0) {
			throw {status: 400, msg: 'Data change failed'};
		}
	}

	async isEmailUsed(email) {
		const result = await this.dbConnection.query('SELECT * FROM users WHERE email=?', email);
		return result.length > 0;
	}

	async userTeamMemberships(id_user) {
		const user_id = Number(id_user);
		userValidation.validateUserID(user_id);
		const teams = await this.dbConnection.query(
				`SELECT t.name, tm.position, s.sport, s.id_sport FROM team_membership AS tm
				JOIN teams AS t ON tm.team=t.id_team
				JOIN sports AS s ON t.id_sport=s.id_sport
				WHERE tm.user=? AND tm.status='active'`
			, user_id);
		return teams;
	}

	async userCompetitionMemberships(id_user) {
		const user_id = Number(id_user);
		userValidation.validateUserID(user_id);
		const competitions = await this.dbConnection.query(
				`SELECT t.name, tm.position, s.sport, s.id_sport, c.name, c.start_date, c.end_date, 'is_active' FROM team_membership AS tm
  				JOIN teams t ON tm.team = t.id_team
  				JOIN competition_membership cm ON t.id_team = cm.team
  				JOIN competitions c ON cm.competition = c.id_competition
  				JOIN sports AS s ON t.id_sport=s.id_sport
  				WHERE tm.user=6 AND cm.status='active'`
			, user_id);
		return competitions;
	}
}
