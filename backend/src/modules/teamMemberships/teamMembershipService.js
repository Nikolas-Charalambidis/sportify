import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as teamMembershipValidation from "./teamMembershipValidations";

export default class TeamMembershipService {

	constructor(req) {
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async addNewMember(id_team, id_user, id_position, status) {
		const team = Number(id_team);
		const user = Number(id_user);
		const position = Number(id_position);
		teamMembershipValidation.validateNewMemberData(team, user, position, status);
		const result = await this.dbConnection.query(
			`INSERT INTO team_membership (id_team_membership, id_team, id_user, status, id_position) 
			 VALUES (NULL, ?, ?, ?, ?)`,
			[team, user, status, position]
		);
		if (result.affectedRows === 0) {
			throw {status: 500, msg: 'Vytvoření nového člena se nezdařilo'};
		}
	}

	async filteredTeamMemberships(id_team, id_user, id_match, team_membership_status) {
		const {team, user, match, status} = teamMembershipValidation.validateTeamMembershipsData(id_team, id_user, id_match, team_membership_status);

		var where = '';
		var values = [];
		if (status !== undefined) {
			where += ' AND t.status=?';
			values.push(status);
		}

		if (user !== undefined) {
			where += ' AND t.id_user=?';
			values.push(user);
		}

		if (id_match === undefined) {
			return this.dbConnection.query(
				`SELECT *, CONCAT(u.name, ' ', u.surname) AS name FROM team_membership AS t 
				 JOIN positions p on t.id_position = p.id_position
				 JOIN users u on t.id_user = u.id_user WHERE t.id_team = ?` + where
				, [team, ...values]
			);
		} else return this.dbConnection.query(
			`SELECT *, CONCAT(u.name, ' ', u.surname) AS name FROM team_membership AS t 
				 JOIN positions p on t.id_position = p.id_position
				 JOIN users u on t.id_user = u.id_user 
				 WHERE t.id_team = ? 
				 AND t.id_user NOT IN(
			 		SELECT id_user FROM matchups WHERE id_team=? AND id_match=?)` + where
			, [team, team, match, ...values]
		);
	}

	async updateStatus(id_team, id_user, team_membership_status) {
		// eslint-disable-next-line no-unused-vars
		const {team, user, status} = teamMembershipValidation.validateTeamMembershipsData(id_team, id_user, undefined, team_membership_status);

		const result = await this.dbConnection.query(
			`UPDATE team_membership SET status=? WHERE id_team=? AND id_user=?`,
			[status, team, user]
		);
		if (result.affectedRows === 0) {
			throw {status: 404, msg: 'Hráč nebo tým nebyl nalezen'};
		}
	}
}
