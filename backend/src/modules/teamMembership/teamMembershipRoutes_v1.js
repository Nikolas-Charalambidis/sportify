import { Router } from 'express';
import TeamService from "../teamMembership/teamMembershipService";

const router = Router();

/**
 * @swagger
 * /teamMembership/getAvailablePlayers:
 *   get:
 *     tags:
 *       - TeamMembership
 *     name: Login
 *     summary: Get all sports
 *     responses:
 *       200:
 *         description: All sports returned
 */
router.post('/getAvailablePlayers', async (req, res, next) => {
    try {
        const { id_team, id_match } = req.body;
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
