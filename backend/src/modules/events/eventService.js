import dotenv from 'dotenv';
import { DB_CONNECTION_KEY } from '../../libs/connection';
import * as eventValidation from "../events/eventValidations";

dotenv.config();
dotenv.config({path: '.env'});

const env = process.env;

export default class EventService {
	constructor(req) {
		this.req = req;
		this.dbConnection = req[DB_CONNECTION_KEY];
	}

	async deleteEvent(id_event){
		const event_id = Number(id_event);
		eventValidation.validateEventID(event_id);
		const result = await this.dbConnection.query(
			`DELETE FROM events WHERE id_event=?`, [event_id]
		);
		if (result.affectedRows === 0) {
			throw {status: 404, msg: 'Event nebyl nalezen v databázi'};
		}
	}

	async addEvents(values, id_match){
		try {
			const array = [];
			values.map(item => {
				const data = eventValidation.validateAddEventsData(item, id_match);
				array.push([
					data.type,
					data.id_team,
					data.id_match,
					data.id_user,
					data.id_assistance1,
					data.id_assistance2,
					data.minute,
					data.value,
					data.host
				]);
			});

			const result = await this.dbConnection.batch(
				`INSERT INTO events (type, id_team, id_match, id_user, id_assistance1, id_assistance2, minute, value, host)
				 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, array
			);
			if(result.affectedRows !== values.length) {
				throw {status: 500, msg: 'Nepodařilo se uložit všechny eventy'};
			}
		} catch (e) {
			console.log("error", e);
		}

	}

	async changeShots(id_event, value){
		const event_id = Number(id_event);
		const value_number = Number(value);
		eventValidation.validateChangeShotsData(event_id, value_number);

		const result = await this.dbConnection.query(
			`UPDATE events SET value=? WHERE id_event=?`, [value_number, event_id]
		);
		if (result.affectedRows === 0) {
			throw {status: 404, msg: 'Event nebyl nalezen v databázi'};
		}
	}
}