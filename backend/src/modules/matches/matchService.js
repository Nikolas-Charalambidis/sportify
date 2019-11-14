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
			`SELECT * FROM matches WHERE id_match=?`, match_id);
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

	async getMatchupsByMatchId(id_match) {
		const match_id = Number(id_match);
		matchValidations.validateMatchId(match_id);
		const host = await this.dbConnection.query(`SELECT * FROM matchup WHERE id_match=? AND host=true`, match_id);
		const guest = await this.dbConnection.query(`SELECT * FROM matchup WHERE id_match=? AND host=false`, match_id);
		return {host: host, guest: guest};
	}

	async getEventsByMatchId(id_match) {
		const match_id = Number(id_match);
		matchValidations.validateMatchId(match_id);
		const host = await this.dbConnection.query(`SELECT * FROM events WHERE id_match=? AND host=true`, match_id);
		const guest = await this.dbConnection.query(`SELECT * FROM events WHERE id_match=? AND host=false`, match_id);
		return {host: host, guest: guest};
	}
}