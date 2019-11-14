import { Router } from 'express';
import MatchService from "./matchService";

const router = Router();

/**
 * @swagger
 * /matches/{id_team}:
 *   post:
 *     tags:
 *       - Matches
 *     name: Matches
 *     summary: Get all matches by teamID
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: path
 *         name: id_team
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All matches of team returned
 *       400:
 *         description: Invalid request
 */
router.get('/:id_team', async (req, res, next) => {
	try {
		const { id_team } = req.params;
		const matches = await new MatchService(req).getMatchesByTeam(id_team);
		res.status(200).json({ error: false, msg: 'OK', matches: matches});
	} catch(e) {
		next(e);
	}
});

export default router;
