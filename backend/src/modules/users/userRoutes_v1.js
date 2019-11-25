import { Router } from 'express';
import UserService from "./userService";
import dotenv from "dotenv";
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

const router = Router();
dotenv.config();
dotenv.config({path: '.env'});
const env = process.env;

/**
 * @swagger
 * /users/{id_user}:
 *   get:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Get an user by ID
 *     parameters:
 *       - name: id_user
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.get('/:id_user', async(req, res, next) => {
	try {
		const { id_user } = req.params;
		const user = await new UserService(req).findUserById(id_user);
		res.status(200).json({ error: false, msg: 'OK', user: user});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /users:
 *   patch:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Change user password
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_user:
 *               type: integer
 *             oldPassword:
 *               type: string
 *             newPassword1:
 *               type: string
 *             newPassword2:
 *               type: string
 *     responses:
 *       200:
 *         description: User password has been changed
 *       400:
 *         description: Invalid request
 */
router.patch('/', async(req, res, next) => {
	try {
		const { id_user, oldPassword, newPassword1, newPassword2 } = req.body;
		await new UserService(req).changePassword(id_user, oldPassword, newPassword1, newPassword2);
		res.status(200).send({ error: false, msg: 'OK', id_user: id_user});
	} catch (e) {
		next(e);
	}
});

/**
 * @swagger
 * /users:
 *   put:
 *     tags:
 *       - Users
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
 *             id_user:
 *               type: integer
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *     responses:
 *       200:
 *         description: User data has been changed
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.put('/', async(req, res, next) => {
	try {
		const { id_user, name, surname } = req.body;
		await new UserService(req).changeUser(id_user, name, surname);
		res.status(200).send({ error: false, msg: 'OK', id_user: id_user});
	} catch (e) {
		next(e);
	}
});

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Get all the users
 *     responses:
 *       200:
 *         description: All users returned
 */
router.get('/', async (req, res, next) => {
	const users = await new UserService(req).allUsers();
	await res.status(200).json({ error: false, msg: 'OK', users: users});
});

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Add new user
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password1:
 *               type: string
 *             password2:
 *               type: string
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *     responses:
 *       201:
 *         description: User added
 *       400:
 *         description: Invalid request
 */
router.post('/', async(req, res, next) => {
	try {
		const { email, password1, password2, name, surname } = req.body;
		const id = await new UserService(req).addNewUser(email, password1, password2, name, surname);
		res.status(201).header('Location' , `/api/v1/users/${id}`).send({ error: false, msg: 'OK', id_user: id});
	} catch (e) {
		next(e);
	}
});

/**
 * @swagger
 * /users/avatar:
 *   get:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Upload user avatar
 *     responses:
 *       201:
 *         description: Avatar uploaded
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 *       500:
 *         description: Upload failed
 */
router.post('/avatar', multipartMiddleware, async(req, res, next) => {
	try {
		const { id } = req.body;
		const params = {
			folder: `sportify/${env.CLOUDINARY_FOLDER}/users`,
			allowedFormats: ['jpg', 'jpeg', 'png'],
			transformation: [
				{width: 400, height: 400, gravity: "face", crop: "crop"},
				{width: 200, height: 200,crop: "scale"}
			]
		};
		const url = await new UserService(req).uploadAvatar(req.files.file.path, params, id);
		res.status(201).json({ error: false, msg: 'Nahrání avatara proběhlo úspěšně', url: url});
	} catch (e) {
		next(e);
	}
});

/**
 * @swagger
 * /users/avatar/{id_team}:
 *   get:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Get avatar url by user id
 *     parameters:
 *       - name: id_user
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: URL returned
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.get('/avatar/:id_user', multipartMiddleware, async(req, res, next) => {
	try {
		const { id_user } = req.params;
		const url = await new UserService(req).getAvatar(id_user);
		res.status(200).json({ error: false, msg: 'OK', url: url});
	} catch (e) {
		next(e);
	}
});

/**
 * @swagger
 * /users/{id_user}/team:
 *   get:
 *     tags:
 *       - Users
 *     name: Team ownerships
 *     summary: Get all teams the user is owner of
 *     parameters:
 *       - name: id_user
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Teams found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Teams not found
 */
router.get('/:id_user/team', async(req, res, next) => {
	try {
		const { id_user } = req.params;
		const teams = await new UserService(req).userTeam(id_user);
		res.status(200).json({ error: false, msg: 'OK', user: teams});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /users/{id_user}/competition:
 *   get:
 *     tags:
 *       - Users
 *     name: Competition ownerships
 *     summary: Get all competition the user is owner of
 *     parameters:
 *       - name: id_user
 *         in: path
 *         description: User ID
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
router.get('/:id_user/competition', async(req, res, next) => {
	try {
		const { id_user } = req.params;
		const user = await new UserService(req).userCompetition(id_user);
		res.status(200).json({ error: false, msg: 'OK', user: user});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /users/{id_user}/teamMembership:
 *   get:
 *     tags:
 *       - Users
 *     name: Team memberships
 *     summary: Get all teams the user is member of
 *     parameters:
 *       - name: id_user
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Teams found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Teams not found
 */
router.get('/:id_user/teamMembership', async(req, res, next) => {
	try {
		const { id_user } = req.params;
		const user = await new UserService(req).userTeamMemberships(id_user);
		res.status(200).json({ error: false, msg: 'OK', user: user});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /users/{id_user}/competitionMembership:
 *   get:
 *     tags:
 *       - Users
 *     name: Competition participations
 *     summary: Get all competitions the user participates in
 *     parameters:
 *       - name: id_user
 *         in: path
 *         description: User ID
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
router.get('/:id_user/competitionMembership', async(req, res, next) => {
	try {
		const { id_user } = req.params;
		const user = await new UserService(req).userCompetitionMemberships(id_user);
		res.status(200).json({ error: false, msg: 'OK', user: user});
	} catch(e) {
		next(e);
	}
});

/**
 * TeamDetailAdmin object Swagger definition
 *
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       id_user:
 *         type: integer
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       name:
 *         type: string
 *       surname:
 *         type: string
 *       verified:
 *         type: boolean
 */

export default router;