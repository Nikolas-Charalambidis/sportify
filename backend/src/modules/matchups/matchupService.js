import { DB_CONNECTION_KEY } from '../../libs/connection';
import * as matchupValidations from "./matchupValidations";

export default class MatchupService {

	constructor(req) {
		this.req = req;
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async addPlayerToMatchup(id_match, id_team, id_user, host) {
		const match_id = Number(id_match);
		const team_id = Number(id_team);
		const user_id = Number(id_user);
		matchupValidations.validateAddPlayerData(match_id, team_id, user_id, host);
		const result = await this.dbConnection.query(
			`INSERT INTO matchups (id_matchup, id_match, goalkeeper, id_team, id_user, host)
			 VALUES (NULL, ?, 0, ?, ?, ?)`,
			[match_id, team_id, user_id, host]
		);
		if (result.affectedRows === 0) {
			throw {status: 500, msg: 'Přidání hráče do sestavy se nezdařilo'};
		}
	}

	async deletePlayerFromMatchup(id_matchup, id_user) {
		const matchup_id = Number(id_matchup);
		const user_id = Number(id_user);
		matchupValidations.validateDeleteFromMatchupData(matchup_id, user_id);
		let result = await this.dbConnection.query(
			`DELETE FROM matchups WHERE id_matchup=?`,
			[matchup_id]
		);
		if (result.affectedRows === 0) {
			throw {status: 404, msg: 'Nepodařilo se nalézt patřičný záznam v databázi'};
		}
	}

	async setGoalkeeper(id_matchup, goalkeeper) {
		const matchup_id = Number(id_matchup);
		matchupValidations.validateSetGoalkeeperData(matchup_id, goalkeeper);
		let result = await this.dbConnection.query(
			`UPDATE matchups SET goalkeeper=? WHERE id_matchup=?`,
			[goalkeeper, matchup_id]
		);
		if (result.affectedRows === 0) {
			throw {status: 404, msg: 'Hráč není součástí sestavy'};
		}
	}
}