import express from 'express';
import dotenv from 'dotenv';
import swagger_v1 from './swagger/v1';

import users_v1 from './v1/users';
import teams_v1 from './v1/teams'

dotenv.config();
dotenv.config({path: '.env.local'});

const {PORT = 3001} = process.env;

const api = express();
api.listen(PORT, () => console.log(`API started at http://localhost:${PORT}!`));

// Sanity endpoint test
api.get('/foo', (req, res, next) => {
	res.json({foo: 'bar'});
});

// API v1
users_v1(api);
teams_v1(api);

// Swagger documentation
swagger_v1(api);

// Error handling
api.use((req, res, next) => {
	res.status(404);
	res.json({error: '404: Not found'});
});

// Initialization
api.use((err, req, res, next) => console.error('There was an error', err));
