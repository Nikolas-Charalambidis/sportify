import { DB_CONNECTION_KEY } from '../../libs/connection';
import * as matchValidations from "./matchValidations";

export default class MatchService {

	constructor(req) {
		this.req = req;
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async allMatches() {
		return this.dbConnection.query(`SELECT * FROM matches`);
	}

	async findMatchById(id_match) {
		const match_id = Number(id_match);
		matchValidations.validateMatchId(match_id);
		const result = await this.dbConnection.query(
			`SELECT m.id_competition, m.id_guest, m.id_host, m.id_match, m.date,
			 guest.name AS guest_name, host.name AS host_name, c.name AS competition_name 
			 FROM matches AS m
			 LEFT JOIN competitions AS c ON c.id_competition=m.id_competition
			 JOIN teams AS guest ON guest.id_team=m.id_guest
			 JOIN teams AS host ON host.id_team=m.id_host
			 WHERE id_match=?`,
			match_id
		);
		if (result.length === 0) {
			throw {status: 404, msg: 'Zápas nebyl nalezen v databázi'};
		}
		return result[0];
	}

	async deleteMatch(id_match) {
		const match_id = Number(id_match);
		matchValidations.validateMatchId(match_id);
		const result = await this.dbConnection.query(
			`DELETE FROM matches WHERE id_match=?`,
			[match_id]
		);
		if(result.affectedRows === 0){
			throw {status: 404, msg: 'Zápas nebyl nalezen v databázi'};
		}
	}

	async getMatchupsByMatchId(id_match, host) {
		const match_id = Number(id_match);
		matchValidations.validateMatchId(match_id);
		const query =
			`SELECT m.id_matchup, m.id_match, m.goalkeeper, m.id_team, m.id_user, m.host, 
				CONCAT(u.name, ' ', u.surname) AS name
			 FROM matchup AS m
			 JOIN users AS u ON u.id_user=m.id_user
			 WHERE m.id_match=? AND m.host=?`;
		return this.dbConnection.query(query, [match_id, host]);
	}

	async getEventsByMatchId(id_match, host) {
		const match_id = Number(id_match);
		matchValidations.validateMatchId(match_id);
		const query =
			`SELECT e.id_event, e.id_match, e.id_team, e.id_user, e.type, e.minute, e.host, 
				CONCAT(ua1.name, ' ', ua1.surname) AS name_assistance1,
				CONCAT(ua2.name, ' ', ua2.surname) AS name_assistance2,
				CONCAT(u.name, ' ', u.surname) AS name
			 FROM events AS e
			 LEFT JOIN users AS u ON u.id_user=e.id_user
			 LEFT JOIN users AS ua1 ON ua1.id_user=e.id_assistance1
			 LEFT JOIN users AS ua2 ON ua2.id_user=e.id_assistance2
			 WHERE e.id_match=? AND e.host=? AND NOT e.type='shot'`;
		return this.dbConnection.query(query, [match_id, host]);
	}

	async getShotsByMatchId(id_match, host) {
		const match_id = Number(id_match);
		matchValidations.validateMatchId(match_id);
		const query =
			`SELECT e.id_event, e.id_match, e.id_team, e.id_user, e.type, e.value, e.host
			 FROM events AS e
			 WHERE e.id_match=? AND e.host=? AND e.type='shot'`;
		const result = await this.dbConnection.query(query, [match_id, host]);

		if (result.length === 0) {
			throw {status: 404, msg: 'Zápas nebyl nalezen v databázi'};
		}
		return result[0];
	}
}