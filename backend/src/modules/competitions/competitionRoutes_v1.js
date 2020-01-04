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
 *     responses:
 *       200:
 *         description: All competitions returned
 */
router.get('/', async (req, res) => {
	const competitions = await new CompetitionService(req).allCompetitions();
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
 *     responses:
 *       200:
 *         description: All competitions returned
 */
router.get('/:id_competition/teams', async (req, res) => {
	const { id_competition } = req.params;
	const competitions = await new CompetitionService(req).getCompetitionTeams(id_competition);
	await res.status(200).json({ error: false, msg: 'OK', competitions: competitions});
});

/**
 * @swagger
 * /competitions/{id_competition}/statistics/{is_goalkeeper}:
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
 *         in: path
 *         required: true
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

export default router;
