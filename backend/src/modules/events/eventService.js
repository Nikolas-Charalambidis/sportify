import dotenv from 'dotenv';
import { DB_CONNECTION_KEY } from '../../libs/connection';
import * as utils from '../../libs/utils';
import * as eventValidation from "../events/eventValidations";
import jwt from 'jsonwebtoken';

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

	async addEvent(values){
		const { id_user, type, id_team, id_match, id_assistance1, id_assistance2, minute, value, host } = values;
		let id_user_number = Number(id_user);
		let id_assistance1_number = Number(id_assistance1);
		let id_assistance2_number = Number(id_assistance2);
		const id_minute_number = Number(minute);
		const value_number = Number(value);
		const host_number = Number(host);

		if(!id_user_number){
			id_user_number = null
		}
		if(!id_assistance1_number){
			id_assistance1_number = null
		}
		if(!id_assistance2_number){
			id_assistance2_number = null
		}
		const result = await this.dbConnection.query(
			`INSERT INTO events (id_event, type, id_team, id_match, id_user, id_assistance1, id_assistance2, minute, value, host)
			 VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[type, id_team, id_match, id_user_number, id_assistance1_number, id_assistance2_number, id_minute_number, value_number, host_number]
		);
		if (result.affectedRows === 0) {
			throw {status: 500, msg: 'Přidání eventu se nezdařilo'};
		}
	}

	async changeShots(id_event, value){
		const event_id = Number(id_event);
		const value_number = Number(value);
		console.log("values", event_id, value_number);
		eventValidation.validateChangeShotsData(event_id, value_number);
		const result = await this.dbConnection.query(
			`UPDATE events SET value=? WHERE id_event=?`, [value_number, event_id]
		);
		if (result.affectedRows === 0) {
			throw {status: 404, msg: 'Event nebyl nalezen v databázi'};
		}
	}
}