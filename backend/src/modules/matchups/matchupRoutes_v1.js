import { Router } from 'express';
import MatchupService from "./matchupService";

const router = Router();

/**
 * @swagger
 * /matchups:
 *   post:
 *     tags:
 *       - Matchups
 *     name: Add Player
 *     summary: Add player to matchup
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_match:
 *               type: integer
 *             id_team:
 *               type: integer
 *             id_user:
 *               type: integer
 *             host:
 *               type: boolean
 *             goalkeeper:
 *               type: boolean
 *     responses:
 *       201:
 *         description: Player added to matchup
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Item not found in database
 *       500:
 *         description: Unexpected error
 */
router.post('/', async (req, res, next) => {
	try {
		const values  = req.body;
		await new MatchupService(req).addPlayersToMatchup([values], values.id_match);
		res.status(201).json({ error: false, msg: 'Uživatel byl přidán do sestavy'});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /matchups/bulk:
 *   post:
 *     tags:
 *       - Matchups
 *     name: Add Player
 *     summary: Add players to matchup - bulk insert
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         type: object
 *         properties:
 *           id_match:
 *             type: integer
 *           matchups:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_match:
 *                   type: integer
 *                 id_team:
 *                   type: integer
 *                 id_user:
 *                   type: integer
 *                 host:
 *                   type: boolean
 *     responses:
 *       201:
 *         description: Player added to matchup
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Item not found in database
 *       500:
 *         description: Unexpected error
 */
router.post('/bulk', async (req, res, next) => {
	try {
		const { matchups, id_match, host } = req.body;
		await new MatchupService(req).addPlayersToMatchup(matchups, id_match, host);
		res.status(201).json({ error: false, msg: 'Hráči byli přidáni do sestavy'});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /matchups/{id_matchup}/{id_user}:
 *   delete:
 *     tags:
 *       - Matchups
 *     name: Matchups
 *     summary: Delete user from matchup by MatchMatchupDetailAdmin ID
 *     parameters:
 *       - in: path
 *         name: id_matchup
 *         required: true
 *         schema:
 *            type: integer
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *            type: integer
 *     responses:
 *       200:
 *         description: User deleted from matchup
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Item not found in database
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
 *   patch:
 *     tags:
 *       - Matchups
 *     name: Set goalkeeper
 *     summary: Change goalkeeper state by MatchMatchupDetailAdmin ID
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_matchup:
 *               type: integer
 *             goalkeeper:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Goalkeeper state set
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Player not found in MatchMatchupDetailAdmin
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
