import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';

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
}
