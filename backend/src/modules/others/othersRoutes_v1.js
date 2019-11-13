import { Router } from 'express';
import {DB_CONNECTION_KEY} from "../../libs/connection";

const router = Router();

/**
 * @swagger
 * /others/teamTypes:
 *   get:
 *     tags:
 *       - TeamTypes
 *     name: Login
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
 * /others/positions:
 *   get:
 *     tags:
 *       - Positions
 *     name: Login
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
 * Sport object Swagger definition
 *
 * @swagger
 * definitions:
 *   TeamTypes:
 *     properties:
 *       id_type:
 *         type: integer
 *       type:
 *         type: string
 */

export default router;
