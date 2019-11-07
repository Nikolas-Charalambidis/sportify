import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as userValidation from './userValidations';
import AuthService from "../auth/authService";
import * as utils from '../../libs/utils';

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
			throw {status: 404, msg: 'Uživatel nebyl nalezen v databázi'};
		}
		return result[0];
	}

	async addNewUser(email, password1, password2, name, surname) {
		userValidation.validateNewUserData(email, password1, password2, name, surname);
		if (await this.isEmailUsed(email)) {
			throw {status: 400, msg: 'Email již existuje'};
		}
		const hashedPassword = utils.hash(password1, 10);
		const result = await this.dbConnection.query(
			`INSERT INTO users (id_user, email, password, name, surname, verified) VALUES (NULL, ?, ?, ?, ?, 0)`,
			[email, hashedPassword, name, surname]
		);
		if (result.affectedRows < 0) {
			throw {status: 500, msg: 'Vytvoření nového uživatele selhalo'};
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
			throw {status: 404, msg: 'Uživatel nebyl nalezen v databázi'};
		}
		if(!utils.verifyHash(oldPassword, user[0].password)){
			throw {status: 400, msg: 'Bylo zadáno neplatné stávající heslo'};
		}
		const result = await this.dbConnection.query(
			'UPDATE users SET password=? WHERE id_user=?',
			[utils.hash(newPassword1, 10), user_id]
		);
		if (result.affectedRows === 0) {
			throw {status: 400, msg: 'Změna hesla se nezdařila'};
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
			throw {status: 400, msg: 'Změna uživatelských údajů se nezdařila'};
		}
	}

	async isEmailUsed(email) {
		const result = await this.dbConnection.query('SELECT * FROM users WHERE email=?', email);
		return result.length > 0;
	}

	async userTeam(id_user) {
		const user_id = Number(id_user);
		userValidation.validateUserID(user_id);
		return this.dbConnection.query(`SELECT * FROM teams WHERE id_leader = ?;`, user_id);
	}

	async userCompetition(id_user) {
		const user_id = Number(id_user);
		userValidation.validateUserID(user_id);
		return this.dbConnection.query(`SELECT * FROM competitions WHERE leader = ?;`, user_id);
	}

	async userTeamMemberships(id_user) {
		const user_id = Number(id_user);
		userValidation.validateUserID(user_id);
		return this.dbConnection.query(
				`SELECT t.id_team, t.name, t.avatar_url, tm.position, s.id_sport, s.sport FROM team_membership AS tm
				JOIN teams AS t ON tm.team=t.id_team
				JOIN sports AS s ON t.id_sport=s.id_sport
				WHERE tm.user=? AND tm.status='active'`
			, user_id);
	}

	async userCompetitionMemberships(id_user) {
		const user_id = Number(id_user);
		userValidation.validateUserID(user_id);
		return this.dbConnection.query(`SELECT 
					t.id_team, 
					t.name as 'team_name', 
					2 as 'team_position', 
					s.id_sport, 
					s.sport, 
					c.id_competition, 
					c.name as 'competition_name', 
					c.avatar_url,
					(c.start_date < DATE(NOW()) AND c.end_date > DATE(NOW())) as 'is_active' 
				FROM team_membership AS tm
  				JOIN teams AS t ON tm.team = t.id_team
  				JOIN competition_membership AS cm ON t.id_team = cm.team
  				JOIN competitions AS c ON cm.competition = c.id_competition
  				JOIN sports AS s ON t.id_sport=s.id_sport
  				WHERE tm.user=? AND cm.status='active'`
			, user_id);
	}

	async uploadAvatar(filepath, params, id_user) {
		const user_id = Number(id_user);
		userValidation.validateUserID(user_id);

		let result = await this.dbConnection.query(
			`SELECT avatar_public_id FROM users WHERE id_user=?`, user_id
		);
		if(result.length === 0) {
			throw {status: 404, msg: 'Uživatel nebyl nalezen v databázi'};
		}
		const { avatar_public_id } = result[0];
		if(avatar_public_id !== null) {
			await utils.deleteAvatarFromCloudinary(avatar_public_id);
		}
		const {url, public_id} = await utils.uploadAvatarToCloudinary(filepath, params);
		result = await this.dbConnection.query(
			`UPDATE users SET avatar_url=?, avatar_public_id=? WHERE id_user=?`,
			[url, public_id, user_id]
		);
		if (result.affectedRows === 0) {
			throw {status: 500, msg: 'Informace o avatarovi se nepodařilo uložit do databáze'};
		}
		return url;
	}

	async getAvatar(id_user) {
		const user_id = Number(id_user);
		userValidation.validateUserID(user_id);

		const result = await this.dbConnection.query(
			`SELECT avatar_url FROM users WHERE id_user=?`, user_id
		);
		if(result.length === 0) {
			throw {status: 404, msg: 'Uživatel nebyl nalezen v databázi'};
		}
		const { avatar_url } = result[0];
		return avatar_url;
	}
}
