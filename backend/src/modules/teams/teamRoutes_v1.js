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

router.get('/:id_team', async (req, res, next) => {
	try {
		const { id_team } = req.params;
		const team = await new TeamService(req).findTeamById(id_team);
		res.status(200).json({ error: false, msg: 'OK', team: team});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams:
 *   put:
 *     tags:
 *       - Teams
 *     name: Login
 *     summary: Change user data
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_team:
 *               type: integer
 *             name:
 *               type: string
 *             id_sport:
 *               type: integer
 *             type:
 *               type: string
 *             id_contact_person:
 *               type: integer
 *     responses:
 *       200:
 *         description: Team data has been changed
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Data change failed
 */
router.put('/', async(req, res, next) => {
	try {
		const { id_team, name, type, id_sport, id_contact_person} = req.body;
		await new TeamService(req).changeTeam(id_team, name, type, id_sport, id_contact_person);
		res.status(200).send({ error: false, msg: 'OK', id_team: id_team});
	} catch (e) {
		next(e);
	}
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
	await res.status(200).json({ error: false, msg: 'OK', teams: teams});
});

/**
 * @swagger
 * /teams:
 *   post:
 *     tags:
 *       - Teams
 *     name: Login
 *     summary: Add new team
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Team"
 *     responses:
 *       201:
 *         description: Team added
 *       400:
 *         description: Invalid request
 */
router.post('/', async (req, res, next) => {
	try {
		const { id_sport, name, type, id_leader } = req.body;
		const id = await new TeamService(req).addNewTeam(id_sport, name, type, id_leader);
		res.status(201).header('Location' , `/api/v1/teams/${id}`).send({ error: false, msg: 'OK', id_team: id});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams/{id_team}/players:
 *   get:
 *     tags:
 *       - Teams
 *     name: Players by team
 *     summary: Get all players of a team by ID
 *     parameters:
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Players found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Players or team not found
 */

router.get('/:id_team/players', async (req, res, next) => {
	try {
		const { id_team } = req.params;
		const players = await new TeamService(req).findPlayersByTeamId(id_team);
		res.status(200).json({ error: false, msg: 'OK', players: players});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams/{id_team}/competitionMembership:
 *   get:
 *     tags:
 *       - Teams
 *     name: Competition participations
 *     summary: Get all competitions the team participates in
 *     parameters:
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Competitions found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Teams not found
 */
router.get('/:id_team/competitionMembership', async(req, res, next) => {
	try {
		const { id_team } = req.params;
		const user = await new TeamService(req).teamCompetitionMemberships(id_team);
		res.status(200).json({ error: false, msg: 'OK', user: user});
	} catch(e) {
		next(e);
	}
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
 *       type:
 *         type: string
 *       id_leader:
 *         type: string
 */

export default router;
