import { Router } from 'express';
import CompetitionService from "./competitionService";

const router = Router();

/**
 * @swagger
 * /competitions:
 *   get:
 *     tags:
 *       - Competitions
 *     name: Login
 *     summary: Get all competitions
 *     responses:
 *       200:
 *         description: All competitions returned
 */
router.get('/', async (req, res) => {
	const competitions = await new CompetitionService(req).allCompetitions();
	await res.status(200).json({ error: false, msg: 'OK', competitions: competitions});
});

export default router;
