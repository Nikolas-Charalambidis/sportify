import { Router } from 'express';
import TeamService from "../teamMembership/teamMembershipService";

const router = Router();

/**
 * @swagger
 * /teamMembership/available:
 *   get:
 *     tags:
 *       - TeamMembership
 *     name: Available players
 *     summary: Get all active players from team who are not in matchup yet
 *     parameters:
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: id_match
 *         in: path
 *         description: Match ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Available Players returned
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Unexpected error
 */
router.get('/available/:id_team/:id_match', async (req, res, next) => {
    try {
        const { id_team, id_match } = req.params;
        const players =  await new TeamService(req).getAvailablePlayers(id_team, id_match);
        res.status(200).json({ error: false, msg: 'OK', players: players});
    } catch(e) {
        next(e);
    }
});

/**
 * TeamMembership object Swagger definition
 *
 * @swagger
 * TeamMembership:
 *   Sport:
 *     properties:
 *       id_team_membership:
 *         type: integer
 *       team:
 *         type: integer
 *       user:
 *         type: integer
 *       status:
 *         type: string
 *       position:
 *         type: string
 */

export default router;
