import dotenv from 'dotenv';
import {DB_CONNECTION_KEY} from '../../libs/connection';
import * as competitionValidations from './competitionValidations';
import {parseISO} from "date-fns";

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

		const result = await this.dbConnection.query(
			`SELECT c.id_competition, c.name, s.sport, c.city, ct.type, c.start_date, c.end_date, COUNT(cm.id_competition_membership) as teams_count
				FROM competitions as c 
				JOIN sports as s ON c.id_sport=s.id_sport
				JOIN competition_types as ct ON c.id_type=ct.id_type
				LEFT JOIN competition_membership as cm ON cm.id_competition=c.id_competition
				WHERE c.id_competition=?`
			, competition
		);

		if (result.length === 0) {
			throw {status: 404, msg: 'Soutěž nebyla nalezena v databázi'};
		}

		return result[0];
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

	async addNewCompetition(name, id_leader, id_sport, id_type, city, start_date, end_date) {
		const leader = Number(id_leader);
		const sport = Number(id_sport);
		const type = Number(id_sport);

		const start = parseISO(start_date);
		const end = parseISO(end_date);

		competitionValidations.validateNewCompetition(name, leader, sport, type, city, start, end);

		const result = await this.dbConnection.query(
			`INSERT INTO competitions (id_competition, name, id_leader, id_sport, id_type, city, start_date, end_date) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)`,
			[name, leader, sport, type, city, start, end]
		);
		if (result.affectedRows === 0) {
			throw {status: 500, msg: 'Vytvoření nové soutěže selhalo'};
		}
	}

	async changeCompetition(id_competition, name, id_leader, city) {
		const leader = Number(id_leader);
		const competition = Number(id_competition);
		competitionValidations.validateChangeCompetition(competition, name, leader, city);

		const result = await this.dbConnection.query(
			'UPDATE competitions SET name=?, id_leader=?, city=? WHERE id_competition=?',
			[name, leader, city, competition]
		);
		if (result.affectedRows === 0) {
			throw {status: 400, msg: 'Změna soutěžních údajů se nezdařila'};
		}
	}

	async getCompetitionStatistics(id_competition, is_goalkeeper) {
		const competition = Number(id_competition);
		competitionValidations.validateCompetitionId(competition);

		return await this.dbConnection.query(`SELECT
					ts.id_user,
					CONCAT(u.name, ' ', u.surname) AS 'name_surname',
					MAX(p.position) AS 'position',
					MAX(p.is_goalkeeper) AS 'is_goalkeeper',
					SUM(ts.field_matches) AS 'matches',
					SUM(ts.field_goals) AS 'goals',
					SUM(ts.field_assists) AS 'assists',
					(SUM(ts.field_goals) + SUM(ts.field_assists)) AS 'field_points',
					((SUM(ts.field_goals) + SUM(ts.field_assists))/SUM(ts.field_matches)) AS 'field_average_points',
					SUM(ts.field_suspensions) AS 'suspensions',
					SUM(ts.goalkeeper_matches) AS 'goalkeeper_matches',
					SUM(ts.goalkeeper_minutes) AS 'goalkeeper_minutes',
					SUM(ts.goalkeeper_goals) AS 'goalkeeper_goals',
					SUM(ts.goalkeeper_zeros) AS 'goalkeeper_zeros',
					(SUM(ts.goalkeeper_zeros)/SUM(ts.goalkeeper_matches)) AS 'goalkeeper_average_zeros',
					SUM(ts.goalkeeper_shots) AS 'goalkeeper_shots',
					CONCAT(100*(1 - SUM(ts.goalkeeper_goals)/SUM(ts.goalkeeper_shots)), ' %') AS 'goalkeeper_success_rate'
						FROM team_statistics as ts
						JOIN users AS u ON ts.id_user = u.id_user
						JOIN team_membership tm on u.id_user = tm.id_user
						JOIN positions AS p on tm.id_position = p.id_position
						WHERE ts.id_competition=? AND p.is_goalkeeper=?
						GROUP BY ts.id_user`
			,[competition, is_goalkeeper]);
	}
}
