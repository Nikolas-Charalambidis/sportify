import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as userValidation from "../users/userValidations";

export default class TeamMembershipService {

	constructor(req) {
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async addNewMember(id_team, id_user, id_position, status) {
		const team = Number(id_team);
		const user = Number(id_user);
		const position = Number(id_position);
		userValidation.validateUserID(team, user, position, status);
		console.log("validated");

		const result = await this.dbConnection.query(
			`INSERT INTO team_membership (id_team_membership, team, user, status, position) 
			 VALUES (NULL, ?, ?, ?, ?)`,
			[team, user, status, position]
		);
		if (result.affectedRows === 0) {
			throw {status: 500, msg: 'Vytvoření nového člena se nezdařilo'};
		}
	}
}
