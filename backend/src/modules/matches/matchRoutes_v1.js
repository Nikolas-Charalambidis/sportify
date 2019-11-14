import { Router } from 'express';
import MatchService from "./matchService";

const router = Router();

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
