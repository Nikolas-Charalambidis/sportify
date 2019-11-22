import { Router } from 'express';
import MatchService from "./matchService";

const router = Router();

/**
 * @swagger
 * /matches:
 *   post:
 *     tags:
 *       - AdminMatches
 *     name: Create Match
 *     summary: Create new Match
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_competition:
 *               type: integer
 *               nullable: true
 *             id_host:
 *               type: integer
 *             id_guest:
 *               type: integer
 *             date:
 *               type: string
 *               example: "2018-11-04"
 *     responses:
 *       201:
 *         description: Match created
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Unexpected error
 */
router.post('/', async (req, res, next) => {
	try {
		const { id_competition, id_host, id_guest, date } = req.body;
		const id_match = await new MatchService(req).addNewMatch(id_competition, id_host, id_guest, date);
		res.status(201).json({ error: false, msg: 'Nový zápas byl úspěšně vytvořen', id_match: id_match});
	} catch(e) {
		next(e);
	}
});

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
 *       500:
 *         description: Unexpected error
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
 *       500:
 *         description: Unexpected error
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
 *       - name: host
 *         in: path
 *         required: true
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Matchups found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Matchups not found
 *       500:
 *         description: Unexpected error
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
 * /matches/{id_match}/events/{host}:
 *   get:
 *     tags:
 *       - AdminMatches
 *     name: AdminMatches
 *     summary: Get shots by match ID
 *     parameters:
 *       - name: id_match
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: host
 *         in: path
 *         required: true
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Shots found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Shots not found
 *       500:
 *         description: Unexpected error
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
 * /matches/{id_match}/events:
 *   get:
 *     tags:
 *       - AdminMatches
 *     name: AdminMatches
 *     summary: Get shots by match ID
 *     parameters:
 *       - name: id_match
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shots found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Shots not found
 *       500:
 *         description: Unexpected error
 */

router.get('/:id_match/events', async (req, res, next) => {
	try {
		const { id_match } = req.params;
		const events = await new MatchService(req).getAllEventsByMatchId(id_match);
		res.status(200).json({ error: false, msg: 'OK', events: events});
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
 *       500:
 *         description: Unexpected error
 */

router.get('/:id_match/shots/:host', async (req, res, next) => {
	try {
		const { id_match, host } = req.params;
		const shots = await new MatchService(req).getShotsByMatchId(id_match, host);
		res.status(200).json({ error: false, msg: 'OK', shots: shots});
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
