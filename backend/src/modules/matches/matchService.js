import { DB_CONNECTION_KEY } from '../../libs/connection';
import * as matchValidations from "./matchValidations";

export default class MatchService {
	constructor(req) {
		this.req = req;
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async deleteMatch(id_match) {
		const match_id = Number(id_match);
		matchValidations.validateMatchID(match_id);
		const result = await this.dbConnection.query(
			`DELETE FROM matches WHERE id_match=?`,
			[match_id]
		);
		if(result.affectedRows === 0){
			throw {status: 404, msg: 'Zápas nebyl nalezen v databázi'};
		}
	}
}