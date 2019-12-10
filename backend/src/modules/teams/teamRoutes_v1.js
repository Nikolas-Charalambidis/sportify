import { Router } from 'express';
import TeamService from './teamService';
import dotenv from "dotenv";
import TeamMembershipService from "../teamMemberships/teamMembershipService";
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

dotenv.config();
dotenv.config({path: '.env'});
const env = process.env;
const router = Router();

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
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Team not found
 */

router.get('/:id_team', async (req, res, next) => {
	try {
		const { id_team } = req.params;
		const team = await new TeamService(req).findTeamById(id_team);
		res.status(200).json({ error: false, msg: 'OK', team: team});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams/{id_team}/avatar:
 *   post:
 *     tags:
 *       - Teams
 *     name: Login
 *     summary: Upload team avatar
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload.
 *     responses:
 *       201:
 *         description: Avatar uploaded
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Team not found
 *       500:
 *         description: Upload failed
 */
router.post('/:id_team/avatar', multipartMiddleware, async(req, res, next) => {
	try {
		const { id_team } = req.params;
		const params = {
			folder: `sportify/${env.CLOUDINARY_FOLDER}/teams`,
			allowedFormats: ['jpg', 'jpeg', 'png'],
			transformation: [
				{width: 400, height: 400, gravity: "face", crop: "crop"},
				{width: 200, height: 200,crop: "scale"}
			]
		};
		const url = await new TeamService(req).uploadAvatar(req.files.file.path, params, id_team);
		res.status(201).json({ error: false, msg: 'Nahrání avatara proběhlo úspěšně', url: url});
	} catch (e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams/{id_team}/avatar:
 *   get:
 *     tags:
 *       - Teams
 *     name: Login
 *     summary: Get avatar url by team id
 *     parameters:
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: URL returned
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Team not found
 */
router.get('/:id_team/avatar', multipartMiddleware, async(req, res, next) => {
	try {
		const { id_user } = req.params;
		const url = await new TeamService(req).getAvatar(id_user);
		res.status(200).json({ error: false, msg: 'OK', url: url});
	} catch (e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams:
 *   put:
 *     tags:
 *       - Teams
 *     name: Login
 *     summary: Change user data
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_team:
 *               type: integer
 *             name:
 *               type: string
 *             id_sport:
 *               type: integer
 *             id_type:
 *               type: integer
 *             id_contact_person:
 *               type: integer
 *             id_leader:
 *               type: integer
 *     responses:
 *       200:
 *         description: Team data has been changed
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Data change failed
 */
router.put('/', async(req, res, next) => {
	try {
		const { id_team, name, id_type, id_sport, id_contact_person, id_leader} = req.body;
		await new TeamService(req).changeTeam(id_team, name, id_type, id_sport, id_contact_person, id_leader);
		res.status(200).send({ error: false, msg: 'Týmové údaje byly změněny', id_team: id_team});
	} catch (e) {
		next(e);
	}
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
router.get('/', async (req, res, next) => {
	const teams = await new TeamService(req).allTeams();
	await res.status(200).json({ error: false, msg: 'OK', teams: teams});
});

/**
 * @swagger
 * /teams:
 *   post:
 *     tags:
 *       - Teams
 *     name: Login
 *     summary: Add new team
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Team"
 *     responses:
 *       201:
 *         description: Team added
 *       400:
 *         description: Invalid request
 */
router.post('/', async (req, res, next) => {
	try {
		const { id_sport, name, id_type, id_leader, id_position } = req.body;
		const id = await new TeamService(req).addNewTeam(id_sport, name, id_type, id_leader);
		let msg = "Tým byl úspěšně vytvořen";
		try {
			await new TeamMembershipService(req).addNewMember(id, id_leader, id_position, 'active');
		} catch(e) {
			msg = "Tým byl vytvořen, ale přidání nového člena do týmu se nezdařilo. Kontaktujte prosím podporu."
		}
		res.status(201).header('Location' , `/api/v1/teams/${id}`).json({ error: false, msg: msg, id_team: id});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams/{id_team}/players:
 *   get:
 *     tags:
 *       - Teams
 *     name: Players by team
 *     summary: Get all players of a team by ID
 *     parameters:
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Players found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Players or team not found
 */

router.get('/:id_team/players', async (req, res, next) => {
	try {
		const { id_team } = req.params;
		const players = await new TeamService(req).findPlayersByTeamId(id_team);
		res.status(200).json({ error: false, msg: 'OK', players: players});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams/{id_team}/competitionMembership:
 *   get:
 *     tags:
 *       - Teams
 *     name: Competition participations
 *     summary: Get all competitions the team participates in
 *     parameters:
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Competitions found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Teams not found
 */
router.get('/:id_team/competitionMembership', async(req, res, next) => {
	try {
		const { id_team } = req.params;
		const team = await new TeamService(req).teamCompetitionMemberships(id_team);
		res.status(200).json({ error: false, msg: 'OK', team: team});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams/{id_team}/statistics:
 *   get:
 *     tags:
 *       - Teams
 *     name: Team statistics
 *     summary: Team statistics
 *     parameters:
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Statistics found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Teams not found
 */
router.get('/:id_team/statistics', async(req, res, next) => {
	try {
		const { id_team } = req.params;
		const team = await new TeamService(req).teamStatistics(id_team);
		res.status(200).json({ error: false, msg: 'OK', team_data: team});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams/{id_team}:
 *   patch:
 *     tags:
 *       - Teams
 *     name: Sets the team as Active
 *     summary: Sets the team as Active
 *     parameters:
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team set as Active
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Team not found
 */
router.patch('/:id_team', async(req, res, next) => {
	try {
		const { id_team } = req.params;
		const team = await new TeamService(req).setActive(id_team, true);
		res.status(200).json({ error: false, msg: 'OK', team_data: team});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams/{id_team}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: Sets the team as Inactive
 *     summary: Sets the team as Inactive
 *     parameters:
 *       - name: id_team
 *         in: path
 *         description: Team ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team set as Inactive
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Team not found
 */
router.delete('/:id_team', async(req, res, next) => {
	try {
		const { id_team } = req.params;
		const team = await new TeamService(req).setActive(id_team, false);
		res.status(200).json({ error: false, msg: 'OK', team_data: team});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /teams/{id_team}/matches:
 *   get:
 *     tags:
 *       - Teams
 *     name: Teams
 *     summary: Get all matches by team ID
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
router.get('/:id_team/matches', async (req, res, next) => {
	try {
		const { id_team } = req.params;
		const matches = await new TeamService(req).getMatchesByTeam(id_team);
		res.status(200).json({ error: false, msg: 'OK', matches: matches});
	} catch(e) {
		next(e);
	}
});


/**
 * Team object Swagger definition
 *
 * @swagger
 * definitions:
 *   Team:
 *     properties:
 *       id_team:
 *         type: integer
 *       name:
 *         type: string
 *       type:
 *         type: string
 *       id_leader:
 *         type: string
 */

export default router;
