import { Router } from 'express';
import CompetitionService from "./competitionMembershipService";

const router = Router();

/**
 * @swagger
 * /competitionMembership/competition/{id_competition}/team/{id_team}:
 *   patch:
 *     tags:
 *       - CompetitionMembership
 *     name: Updates team status of a competition
 *     summary: Updates team status of a competition
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - name: id_competition
 *         in: path
 *         description: Competition ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: [active, inactive, declined, pending]
 *     responses:
 *       200:
 *         description: Team updated
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Unexpected error
 */
router.patch('/competition/:id_competition/team/:id_team', async (req, res, next) => {
	try {
		const { id_competition, id_team } = req.params;
		const { status } = req.body;
		await new CompetitionService(req).updateCompetitionMembership(id_competition, id_team, status);
		res.status(200).json({ error: false, msg: 'Stav týmu v soutěži byl změněn'});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /competitionMembership/competition/{id_competition}/team/{id_team}:
 *   post:
 *     tags:
 *       - CompetitionMembership
 *     name: Add team status of a team in a competition
 *     summary: Add team status of a team in a competition
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - name: id_competition
 *         in: path
 *         description: Competition ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: [active, inactive, declined, pending]
 *     responses:
 *       201:
 *         description: Competition membership created
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Unexpected error
 */
router.post('/competition/:id_competition/team/:id_team', async (req, res, next) => {
	try {
		const { id_competition, id_team } = req.params;
		const { status } = req.body;
		await new CompetitionService(req).addNewTeam(id_competition, id_team, status);
		res.status(200).json({ error: false, msg: 'Nové členství v soutěži bylo vytvořeno'});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /competitionMembership/competition/{id_competition}/team/{id_team}:
 *   delete:
 *     tags:
 *       - CompetitionMembership
 *     name: Removes team from a competition
 *     summary: Removes team from a competition
 *     parameters:
 *       - name: id_competition
 *         in: path
 *         description: Competition ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team removed
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Unexpected error
 */
router.delete('/competition/:id_competition/team/:id_team', async (req, res, next) => {
	try {
		const { id_competition, id_team } = req.params;
		await new CompetitionService(req).removeTeam(id_competition, id_team);
		res.status(200).json({ error: false, msg: 'Tým byl odebrán ze soutěže' });
	} catch(e) {
		next(e);
	}
});

/**
 * CompetitionMembership object Swagger definition
 *
 * @swagger
 * CompetitionMembership:
 *   Sport:
 *     properties:
 *       id_competition_membership:
 *         type: integer
 *       competition:
 *         type: integer
 *       team:
 *         type: integer
 *       status:
 *         type: string
 */

export default router;
