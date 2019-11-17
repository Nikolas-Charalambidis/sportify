import { Router } from 'express';
import MatchupService from "./matchupService";

const router = Router();

/**
 * @swagger
 * /matchups:
 *   get:
 *     tags:
 *       - Matchups
 *     name: Matchups
 *     summary: Get player to matchup
 *     responses:
 *       200:
 *         description: AdminMatches found
 *       404:
 *         description: AdminMatches not found
 */
router.post('/', async (req, res, next) => {
	try {
		const { id_match, id_team, id_user, host } = req.body;
		await new MatchupService(req).addPlayerToMatchup(id_match, id_team, id_user, host);
		res.status(201).json({ error: false, msg: 'Uživatel byl přidán do sestavy'});
	} catch(e) {
		next(e);
	}
});


/**
 * @swagger
 * /matchups:
 *   delete:
 *     tags:
 *       - AdminMatches
 *     name: AdminMatches
 *     summary: Delete match by match ID
 *     parameters:
 *       - in: path
 *         name: id_match
 *         description: Match ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Match deleted
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Match not found
 *       500:
 *         description: Unexpected error
 */
router.delete('/:id_matchup/:id_user', async (req, res, next) => {
	try {
		const { id_matchup, id_user } = req.params;
		await new MatchupService(req).deletePlayerFromMatchup(id_matchup, id_user);
		res.status(200).json({ error: false, msg: 'Hráč byl úspěšně odstraněn ze zápasu'});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /matchups/setGoalkeeper:
 *   delete:
 *     tags:
 *       - AdminMatches
 *     name: AdminMatches
 *     summary: Delete match by match ID
 *     parameters:
 *       - in: path
 *         name: id_match
 *         description: Match ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Goalkeeper state set
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Player not found in matchup
 *       500:
 *         description: Unexpected error
 */
router.patch('/setGoalkeeper', async (req, res, next) => {
	try {
		const { id_matchup, goalkeeper } = req.body;
		await new MatchupService(req).setGoalkeeper(id_matchup, goalkeeper);
		res.status(200).json({ error: false, msg: 'Stav brankáře byl úspěšně změněn'});
	} catch(e) {
		next(e);
	}
});

export default router;
