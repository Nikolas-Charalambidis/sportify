import { Router } from 'express';
import {DB_CONNECTION_KEY} from "../../libs/connection";

const router = Router();

/**
 * @swagger
 * /others/teamTypes:
 *   get:
 *     tags:
 *       - Others
 *     name: Team types
 *     summary: Get all team types
 *     responses:
 *       200:
 *         description: All team types returned
 */
router.get('/teamTypes', async (req, res, next) => {
	const dbConnection = req[DB_CONNECTION_KEY];
	const types = await dbConnection.query(`SELECT * FROM team_types`);
	await res.status(200).json({ error: false, msg: 'OK', types: types});
});

/**
 * @swagger
 * /others/competitionTypes:
 *   get:
 *     tags:
 *       - Others
 *     name: Competition types
 *     summary: Get all competition types
 *     responses:
 *       200:
 *         description: All competition types returned
 */
router.get('/competitionTypes', async (req, res, next) => {
	const dbConnection = req[DB_CONNECTION_KEY];
	const types = await dbConnection.query(`SELECT * FROM competition_types`);
	await res.status(200).json({ error: false, msg: 'OK', types: types});
});

/**
 * @swagger
 * /others/positions:
 *   get:
 *     tags:
 *       - Others
 *     name: Positions
 *     summary: Get all team positions
 *     responses:
 *       200:
 *         description: All team positions returned
 */
router.get('/positions', async (req, res, next) => {
	const dbConnection = req[DB_CONNECTION_KEY];
	const positions = await dbConnection.query(`SELECT * FROM positions`);
	await res.status(200).json({ error: false, msg: 'OK', positions: positions});
});

/**
 * @swagger
 * /others/sports:
 *   get:
 *     tags:
 *       - Others
 *     name: Sports
 *     summary: Get all sports
 *     responses:
 *       200:
 *         description: All sports returned
 */
router.get('/sports', async (req, res, next) => {
	const dbConnection = req[DB_CONNECTION_KEY];
	const sports = await dbConnection.query(`SELECT * FROM sports`);
	await res.status(200).json({ error: false, msg: 'OK', sports: sports});
});

export default router;
