import { Router } from 'express';
import CompetitionService from "./competitionService";

const router = Router();

/**
 * @swagger
 * /competitions:
 *   get:
 *     tags:
 *       - Competitions
 *     name: Competitions
 *     summary: Get all competitions
 *     parameters:
 *      - name: id_sport
 *        in: query
 *        description: Filter by a certain sport
 *        required: false
 *        schema:
 *          type: integer
 *      - name: id_type
 *        in: query
 *        description: Filter by a certain competition type
 *        required: false
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: All competitions returned
 */
router.get('/', async (req, res) => {
	const { id_sport, id_type } = req.query;
	const competitions = await new CompetitionService(req).allCompetitions( id_sport, id_type );
	await res.status(200).json({ error: false, msg: 'OK', competitions: competitions});
});

/**
 * @swagger
 * /competitions/{id_competition}:
 *   get:
 *     tags:
 *       - Competitions
 *     name: Competition by ID
 *     summary: Get a competition by id_competition
 *     produces: application/json
 *     parameters:
 *       - name: id_competition
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All competitions returned
 */
router.get('/:id_competition', async (req, res) => {
	const { id_competition } = req.params;
	const competition = await new CompetitionService(req).getCompetition(id_competition);
	await res.status(200).json({ error: false, msg: 'OK', competition: competition});
});

/**
 * @swagger
 * /competitions/{id_competition}/teams:
 *   get:
 *     tags:
 *       - Competitions
 *     name: Competition teams
 *     summary: Get competition teams by id_competition
 *     produces: application/json
 *     parameters:
 *       - name: id_competition
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: competition_membership_status
 *         in: query
 *         description: Filter by a certain status
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All competitions returned
 */
router.get('/:id_competition/teams', async (req, res) => {
	const { id_competition } = req.params;
	const { competition_membership_status } = req.query;
	const competitions = await new CompetitionService(req).getCompetitionTeams(id_competition, competition_membership_status);
	await res.status(200).json({ error: false, msg: 'OK', competitions: competitions});
});

/**
 * @swagger
 * /competitions/{id_competition}/statistics:
 *   get:
 *     tags:
 *       - Competitions
 *     name: Competition teams
 *     summary: Get competition teams by id_competition
 *     produces: application/json
 *     parameters:
 *       - name: id_competition
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: is_goalkeeper
 *         in: query
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: All competitions returned
 */
router.get('/:id_competition/statistics', async (req, res) => {
	const { id_competition } = req.params;
	const { is_goalkeeper } = req.query;
	const statistics = await new CompetitionService(req).getCompetitionStatistics(id_competition, is_goalkeeper);
	await res.status(200).json({ error: false, msg: 'OK', statistics: statistics});
});

/**
 * @swagger
 * /competitions:
 *   post:
 *     tags:
 *       - Competitions
 *     name: Add a new competition
 *     summary: Add a new competition
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               required: true
 *             id_leader:
 *               type: integer
 *               required: true
 *             id_sport:
 *               type: integer
 *               required: true
 *             id_type:
 *               type: integer
 *               required: true
 *             city:
 *               type: string
 *               required: true
 *             start_date:
 *               type: string
 *               format: date
 *               required: true
 *             end_date:
 *               type: string
 *               format: date
 *               required: true
 *     responses:
 *       201:
 *         description: Competition added
 *       400:
 *         description: Invalid request
 */
router.post('/', async(req, res, next) => {
	try {
		const { name, id_leader, id_sport, id_type, city, start_date, end_date } = req.body;
		const id = await new CompetitionService(req).addNewCompetition(name, id_leader, id_sport, id_type, city, start_date, end_date);
		res.status(201).header('Location' , `/api/v1/competitions/${id}`).send({ error: false, msg: 'OK', id_user: id});
	} catch (e) {
		next(e);
	}
});

/**
 * @swagger
 * /competitions/{id_competition}:
 *   put:
 *     tags:
 *       - Competitions
 *     name: Change competition data
 *     summary: Change competition data
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: path
 *         name: id_competition
 *         description: Competition ID
 *         required: true
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               required: true
 *             id_leader:
 *               type: integer
 *               required: true
 *             city:
 *               type: string
 *               required: true
 *     responses:
 *       200:
 *         description: User data has been changed
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.put('/:id_competition', async(req, res, next) => {
	try {
		const { id_competition } = req.params;
		const { name, id_leader, city } = req.body;
		await new CompetitionService(req).changeCompetition(id_competition, name, id_leader, city);
		res.status(200).send({ error: false, msg: 'OK', id_competition: id_competition});
	} catch (e) {
		next(e);
	}
});

export default router;
