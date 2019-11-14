import { Router } from 'express';
import MatchService from "./matchService";

const router = Router();

/**
 * @swagger
 * /matches/{id_match}:
 *   get:
 *     tags:
 *       - Matches
 *     name: Match
 *     summary: Get a match by ID
 *     parameters:
 *       - name: id_match
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Match found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Match not found
 */

router.get('/:id_match', async (req, res, next) => {
	try {
		const { id_match } = req.params;
		const match = await new MatchService(req).findMatchById(id_match);
		res.status(200).json({ error: false, msg: 'OK', match: match});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /matches/{id_match}/matchups:
 *   get:
 *     tags:
 *       - Matches
 *     name: Match
 *     summary: Get matchups by match ID
 *     parameters:
 *       - name: id_match
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Matchups found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Matchups not found
 */

router.get('/:id_match/matchups', async (req, res, next) => {
	try {
		const { id_match } = req.params;
		const match = await new MatchService(req).getMatchupsByMatchId(id_match);
		res.status(200).json({ error: false, msg: 'OK', matchups: match});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /matches/{id_match}/events:
 *   get:
 *     tags:
 *       - Matches
 *     name: Matches
 *     summary: Get events by match ID
 *     parameters:
 *       - name: id_match
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Events found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Events not found
 */

router.get('/:id_match/events', async (req, res, next) => {
	try {
		const { id_match } = req.params;
		const match = await new MatchService(req).getEventsByMatchId(id_match);
		res.status(200).json({ error: false, msg: 'OK', events: match});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /matches/{id_match}:
 *   delete:
 *     tags:
 *       - Matches
 *     name: Matches
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
router.delete('/:id_match', async (req, res, next) => {
	try {
		const { id_match } = req.params;
		await new MatchService(req).deleteMatch(id_match);
		res.status(200).json({ error: false, msg: 'Zápas byl úspěšně odstraněn'});
	} catch(e) {
		next(e);
	}
});

export default router;
