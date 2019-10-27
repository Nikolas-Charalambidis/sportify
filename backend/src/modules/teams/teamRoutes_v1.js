import { Router } from 'express';
import TeamService from './teamService';

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
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Team not found
 */

router.get('/:team_id', async (req, res, next) => {
	const { team_id } = req.params;
	const id_team = Number(team_id);
	if (!id_team) {
		return res.status(400).json({ error: true, msq: 'Wrong input' });
	}
	const team = await new TeamService(req).findTeamById(id_team);
	if (team.length === 0) {
		return res.status(404).json({ error: true, msq: 'Team not found' });
	}
	await res.json(team);
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
router.get('/', async (req, res, next) => {
	const teams = await new TeamService(req).allTeams();
	await res.json(teams);
});

/**
 * @swagger
 * /teams:
 *   post:
 *     tags:
 *       - Teams
 *     name: Login
 *     summary: Add new team
 *     responses:
 *       201:
 *         description: Team added
 *       400:
 *         description: Invalid request
 */
router.post('/', async (req, res, next) => {
	const { id_sport, name, id_leader } = req.body;
	const sport = Number(id_sport);
	const leader = Number(id_leader);
	if(!sport || !name || !leader){
		return res.status(400).json({ error: true, msq: 'Missing data' });
	}
	const id = await new TeamService(req).addNewTeam(sport, name, leader);
	res.status(201).header('Location' , `/api/v1/teams/${id}`).send({ error: false, msq: 'OK'});
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
 *         type: string
 */

export default router;
