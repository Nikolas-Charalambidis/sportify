import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as teamMembershipValidation from "../teamMembership/teamMembershipValidations";

export default class TeamMembershipService {

	constructor(req) {
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async addNewMember(id_team, id_user, id_position, status) {
		const team = Number(id_team);
		const user = Number(id_user);
		const position = Number(id_position);
		console.log("data", id_team, id_user, id_position, status);
		teamMembershipValidation.validateNewMemberData(team, user, position, status);
		const result = await this.dbConnection.query(
			`INSERT INTO team_membership (id_team_membership, id_team, id_user, status, id_position) 
			 VALUES (NULL, ?, ?, ?, ?)`,
			[team, user, status, position]
		);
		console.log("inserted");
		if (result.affectedRows === 0) {
			throw {status: 500, msg: 'Vytvoření nového člena se nezdařilo'};
		}
	}

	async getAvailablePlayers(id_team, id_match) {
		const team_id = Number(id_team);
		const match_id = Number(id_match);
		teamMembershipValidation.validateAvailablePlayersData(id_team, id_match);
		return this.dbConnection.query(
			`SELECT u.id_user, CONCAT(u.name, ' ', u.surname) AS name 
			 FROM team_membership AS t
			 JOIN users AS u ON u.id_user=t.id_user
			 WHERE t.id_team=?
			 AND t.status='active'
			 AND t.id_user NOT IN (
			 	SELECT id_user FROM matchups WHERE id_team=? AND id_match=?
			 )`
			, [team_id, team_id, match_id]
		);
	}
}
