import { Router } from 'express';

import teamService from './teamService';

const router = Router();

/**
 * @swagger
 * /teams/{id_team}:
 *   get:
 *     tags:
 *       - Teams
 *     name: Login
 *     summary: Get a team by ID
 *     parameters:
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team found
 *       404:
 *         description: Team not found
 */
router.get('/:id_team', (req, res, next) => {
	const {id_team} = req.params;
	const team = teamService.findTeamById(id_team);
	if (!team) {
		res.status(404);
		res.json({});
		return;
	}
	res.json(team);
});

/**
 * @swagger
 * /teams:
 *   get:
 *     tags:
 *       - Teams
 *     name: Login
 *     summary: Get all the teams
 *     responses:
 *       200:
 *         description: All teams returned
 */
router.get('/', (req, res, next) => {
	res.json(teamService.allTeams());
});


/**
 * User object Swagger definition
 *
 * @swagger
 * definitions:
 *   Team:
 *     properties:
 *       id_team:
 *         type: integer
 *       name:
 *         type: string
 *       leader:
 *         type: integer
 */

// Export the Router
export default router;
