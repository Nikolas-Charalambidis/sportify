import { Router } from 'express';
import MatchService from "./matchService";
import TeamService from "../teams/teamService";

const router = Router();

/**
 * @swagger
 * /matches:
 *   get:
 *     tags:
 *       - AdminMatches
 *     name: Match
 *     summary: Get all matches
 *     responses:
 *       200:
 *         description: AdminMatches found
 *       404:
 *         description: AdminMatches not found
 */
router.get('/', async (req, res, next) => {
	const matches = await new MatchService(req).allMatches();
	await res.status(200).json({ error: false, msg: 'OK', matches: matches});
});

/**
 * @swagger
 * /matches/{id_match}:
 *   get:
 *     tags:
 *       - AdminMatches
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
 * /matches/{id_match}/matchup/{host}:
 *   get:
 *     tags:
 *       - AdminMatches
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

router.get('/:id_match/matchup/:host', async (req, res, next) => {
	try {
		const { id_match, host } = req.params;
		const matchup = await new MatchService(req).getMatchupsByMatchId(id_match, host);
		res.status(200).json({ error: false, msg: 'OK', matchup: matchup});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /matches/{id_match}/events:
 *   get:
 *     tags:
 *       - AdminMatches
 *     name: AdminMatches
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

router.get('/:id_match/events/:host', async (req, res, next) => {
	try {
		const { id_match, host } = req.params;
		const events = await new MatchService(req).getEventsByMatchId(id_match, host);
		res.status(200).json({ error: false, msg: 'OK', events: events});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /matches/{id_match}:
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
