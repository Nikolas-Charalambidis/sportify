import { Router } from 'express';
import UserService from "./userService";

const router = Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Verify user email and password
 *     responses:
 *       200:
 *         description: User found
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await new UserService(req).login(email, password);
		const { id_user } = user;
		res.status(200).header('Location' , `/api/v1/teams/${id_user}`)
			.json({ error: false, msg: 'OK', user: user});
	} catch(e) {
		next(e);
	}

});
/**
 * @swagger
 * /users/confirmEmail:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Verify user's email
 *     responses:
 *       200:
 *         description: Email verified, returned user object
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Invalid token
 *       498:
 *         description: Token expired
 */
router.post('/confirmEmail', async (req, res, next) => {
	try {
		const { id_user, hash } = req.body;
		const user = await new UserService(req).confirmEmail(id_user, hash);
		res.status(200).json({ error: false, msg: 'OK', user: user});
	} catch(e) {
		next(e);
	}
});

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
 *     name: Login
 *     summary: Add new user
 *     requestBody:
 *     	 content:
 *         application/json:
 *           schema:
 *     	       type: object
 *     		   properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     		   examples:
 *               email: email@test.cz
 *               name: Zdeněk
 *     responses:
 *       201:
 *         description: User added
 *       400:
 *         description: Invalid request
 */
router.post('/', async(req, res, next) => {
	try {
		const { email, password, name, surname } = req.body;
		const id = await new UserService(req).addNewUser(email, password, name, surname);
		res.status(201).header('Location' , `/api/v1/users/${id}`).send({ error: false, msg: 'OK', id_user: id});
	} catch (e) {
		next(e);
	}

});

/**
 * Team object Swagger definition
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
