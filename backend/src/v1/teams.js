import express from 'express';

const teams = (api) => {

	const router = express.Router();
	api.use('/api/v1', router);

	/**
	 * @swagger
	 * definitions:
	 *   Team:
	 *     properties:
	 *       id_team:
	 *         type: integer
	 *       name:
	 *         type: string
	 *       leader:
	 *         type: integer
	 */
	const data = [
		{
			id_team: 1,
			name: 'Team 01',
			leader: 1
		}, {
			id_team: 2,
			name: 'Team 02',
			leader: 2
		}
	];

	/**
	 * @swagger
	 * /teams/{id_team}:
	 *   get:
	 *     tags:
	 *       - Teams
	 *     name: Login
	 *     summary: Get a team by ID
	 *     parameters:
	 *       - name: id_team
	 *         in: path
	 *         description: Team ID
	 *         required: true
	 *         schema:
	 *           type: integer
	 *     responses:
	 *       200:
	 *         description: Team found
	 *       404:
	 *         description: Team not found
	 */
	router.get('/teams/:id_team', (req, res, next) => {
		const {id_team} = req.params;
		const team = data.find(team => Number(team.id_team) === Number(id_team));
		if (!team) {
			res.status(404);
			res.json({});
			return;
		}
		res.json(team);
	});

	/**
	 * @swagger
	 * /teams:
	 *   get:
	 *     tags:
	 *       - Teams
	 *     name: Login
	 *     summary: Get all the teams
	 *     responses:
	 *       200:
	 *         description: All teams returned
	 */
	router.get('/teams', (req, res, next) => {
		res.json(data);
	});
};

export default teams;