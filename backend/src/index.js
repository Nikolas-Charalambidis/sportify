import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from "./routes";
import statusError from "./error/error"

dotenv.config();
dotenv.config({path: '.env.local'});

const {PORT = 3001} = process.env;

const api = express();

api.use(bodyParser.json());
api.use(cors());
api.listen(PORT, () => console.log(`\nAPI started at http://localhost:${PORT}`));

// Sanity endpoint test
api.get('/foo', (req, res, next) => {
	res.json({foo: 'bar'});
});

api.use(router);

// Error handling
api.use(statusError(404, 'Not found'));

// Initialization
api.use((err, req, res, next) => console.error('There was an error', err));
