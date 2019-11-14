import { DB_CONNECTION_KEY } from '../../libs/connection';
import * as matchValidations from "./matchValidations";

export default class MatchService {
	constructor(req) {
		this.req = req;
		this.dbConnection = req[DB_CONNECTION_KEY];
	}


}