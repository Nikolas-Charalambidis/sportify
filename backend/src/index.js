import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from "./routes";
import { addDbToRequest, DB_CONNECTION_KEY } from './libs/connection';
import {logErrors, clientErrorHandler, errorHandler } from "./handler"

dotenv.config();
dotenv.config({path: '.env'});

const {PORT = 3001} = process.env;
const api = express();

api.listen(PORT, () => console.log(`\nAPI started at http://localhost:${PORT}`));

api.use(bodyParser.json());
api.use(cors());
api.use(addDbToRequest);

// Middleware
api.use(function(req, res, next) {
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	next();
});

// Healthcheck
api.get('/health', async (req, res, next) => {
	const dbConnection = req[DB_CONNECTION_KEY];
	const testQueryResult = await dbConnection.query('SELECT 1 as val');
	if (testQueryResult) {
		res.json({api: 'up', database: 'up', characters: 'ěščřžýáíéůúďťň'});
	}
});

// Dispatcher
api.use(router);

// Handling errors and logging
api.use(function (err, req, res, next) {
	if(err) {
		let { status, msg, link } = err;
		if(!status){
			status = 500;
		}
		if(!msg){
			msg = "Neočekávaná chyba";
		}
		if(!link){
			link = null;
		}
		res.status(status).json({status: status, error: true, msg: msg, link: link})
	}
});
api.use(logErrors);
api.use(clientErrorHandler);
api.use(errorHandler);