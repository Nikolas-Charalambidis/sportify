import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as competitionMembershipValidation from "./competitionMembershipValidations";

export default class CompetitionMembershipService {

	constructor(req) {
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async addNewTeam(id_competition, id_team, status) {
		const competition = Number(id_competition);
		const team = Number(id_team);
		competitionMembershipValidation.validateNewTeamData(competition, team, status);

		const existing = await this.dbConnection.query(
			`SELECT * FROM competition_membership WHERE id_competition=? AND id_team=?`,
			[competition, team]
		);

		if (existing.length === 0) {
			const result = await this.dbConnection.query(
				`INSERT INTO competition_membership (id_competition_membership, id_competition, id_team, status) 
				 VALUES (NULL, ?, ?, ?)`,
				[competition, team, status]
			);
			if (result.affectedRows === 0) {
				throw {status: 500, msg: 'Vytvoření nového členství v soutěži se nezdařilo'};
			}
		} else {
			throw {status: 500, msg: 'Tento tým je již v soutěži'};
		}
	}

	async updateCompetitionMembership(id_competition, id_team, competition_membership_status) {
		// eslint-disable-next-line no-unused-vars
		const {competition, team, status} = competitionMembershipValidation.validateCompetitionMembershipsData(id_competition, id_team, competition_membership_status);

		var values = [];
		var set = '';
		if (status !== undefined) {
			set = 'SET status=?';
			values.push(status);
		} else {
			throw {status: 500, msg: 'Status must be specified.'};
		}
		const result = await this.dbConnection.query(
			`UPDATE competition_membership ` + set + ` WHERE id_competition=? AND id_team=?`,
			[...values, competition, team]
		);

		if (result.affectedRows === 0) {
			throw {status: 404, msg: 'Tým nebo soutěž nebyl nalezen'};
		}
	}

	async removeTeam(id_competition, id_team) {
		const competition = Number(id_competition);
		const team = Number(id_team);
		competitionMembershipValidation.validateRemoveTeamData(competition, team);

		let result = await this.dbConnection.query(
			`DELETE FROM competition_membership WHERE id_competition=? AND id_team=?`,
			[competition, team]
		);
		if (result.affectedRows === 0) {
			throw {status: 404, msg: 'Nepodařilo se nalézt patřičný záznam v databázi'};
		}
	}
}
