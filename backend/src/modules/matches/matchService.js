import { DB_CONNECTION_KEY } from '../../libs/connection';
import * as matchValidations from "./matchValidations";

export default class MatchService {
	constructor(req) {
		this.req = req;
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async getMatchesByTeam(id_team){
		const team_id = Number(id_team);
		matchValidations.validateTeamID(team_id);
		return this.dbConnection.query(
			`SELECT 
				m.id_match, m.date,
				host.name AS host_name, guest.name AS guest_name,
				c.name AS competition_name
			 FROM matches as m
			 JOIN competitions as c ON m.id_competition=c.id_competition 
			 JOIN teams as host ON m.id_host=host.id_team 
			 JOIN teams as guest ON m.id_guest=guest.id_team
			 WHERE m.id_host=? OR m.id_guest=?`,
			[team_id, team_id]
		);
	}
}