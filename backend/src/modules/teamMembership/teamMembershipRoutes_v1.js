import { Router } from 'express';
import {DB_CONNECTION_KEY} from "../../libs/connection";

const router = Router();

/**
 * @swagger
 * /teamMembership:
 *   get:
 *     tags:
 *       - TeamMembership
 *     name: Login
 *     summary: Get all sports
 *     responses:
 *       200:
 *         description: All sports returned
 */
router.post('/', async (req, res, next) => {

});

/**
 * TeamMembership object Swagger definition
 *
 * @swagger
 * TeamMembership:
 *   Sport:
 *     properties:
 *       id_team_membership:
 *         type: integer
 *       team:
 *         type: integer
 *       user:
 *         type: integer
 *       status:
 *         type: string
 *       position:
 *         type: string
 */

export default router;
