import { Router } from 'express';
import {DB_CONNECTION_KEY} from "../../libs/connection";

const router = Router();

/**
 * @swagger
 * /sports:
 *   get:
 *     tags:
 *       - Sports
 *     name: Login
 *     summary: Get all sports
 *     responses:
 *       200:
 *         description: All sports returned
 */
router.get('/', async (req, res, next) => {
	const dbConnection = req[DB_CONNECTION_KEY];
	const users = await dbConnection.query(`SELECT * FROM sports`);
	await res.json(users);
});

/**
 * Sport object Swagger definition
 *
 * @swagger
 * definitions:
 *   Sport:
 *     properties:
 *       id_sport:
 *         type: string
 *       sport:
 *         type: string
 */

export default router;
