import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import {DB_CONNECTION_KEY} from './libs/connection';
import router from "./routes";
import {logErrors, clientErrorHandler, errorHandler } from "./handler"
import {addDbToRequest} from './libs/connection';

dotenv.config();
dotenv.config({path: '.env.local'});

const {PORT = 3001} = process.env;

const api = express();

api.use(bodyParser.json());
api.use(cors());
api.listen(PORT, () => console.log(`\nAPI started at http://localhost:${PORT}`));

api.use(bodyParser.json());
api.use(cors());
api.use(addDbToRequest);

// Healthcheck
api.get('/health', async (req, res, next) => {
	const dbConnection = req[DB_CONNECTION_KEY];
	const testQueryResult = await dbConnection.query('SELECT 1 as val');
	if (testQueryResult) {
		res.json({api: 'up', database: 'up'});
	}
});

// Dispatcher
api.use(router);

// Handling errors and logging
api.use(logErrors);
api.use(clientErrorHandler);
api.use(errorHandler);
