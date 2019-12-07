import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as competitionValidations from './competitionValidations';

dotenv.config();
dotenv.config({path: '.env'});

export default class CompetitionService {

	constructor(req) {
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async allCompetitions() {
		return this.dbConnection.query(
			`SELECT c.id_competition, c.name, s.sport, c.city, ct.type, c.start_date, c.end_date, COUNT(cm.id_competition_membership) as teams_count
				FROM competitions as c 
				JOIN sports as s ON c.id_sport=s.id_sport
				JOIN competition_types as ct ON c.id_type=ct.id_type
				LEFT JOIN competition_membership as cm ON cm.id_competition=c.id_competition
				GROUP BY c.id_competition`
		);
	}

	async getCompetition(id_competition) {
		const competition = Number(id_competition);
		competitionValidations.validateCompetitionId(competition);

		return await this.dbConnection.query(
			`SELECT c.id_competition, c.name, s.sport, c.city, ct.type, c.start_date, c.end_date, COUNT(cm.id_competition_membership) as teams_count
				FROM competitions as c 
				JOIN sports as s ON c.id_sport=s.id_sport
				JOIN competition_types as ct ON c.id_type=ct.id_type
				LEFT JOIN competition_membership as cm ON cm.id_competition=c.id_competition
				WHERE c.id_competition=?
				GROUP BY c.id_competition`
			, competition
		);
	}

	async getCompetitionTeams(id_competition) {
		const competition = Number(id_competition);
		competitionValidations.validateCompetitionId(competition);

		return await this.dbConnection.query(
			`SELECT cm.id_competition_membership, cm.id_competition, cm.id_team, cm.status, t.id_sport, t.name, t.id_leader, t.id_contact_person, t.active, t.avatar_public_id, t.avatar_url FROM competition_membership AS cm
				JOIN teams t ON cm.id_team = t.id_team
				WHERE cm.id_competition=?;`
			, competition
		);
	}
}
