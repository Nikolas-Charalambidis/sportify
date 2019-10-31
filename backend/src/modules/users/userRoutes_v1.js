import { Router } from 'express';
import UserService from "./userService";

const router = Router();

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
		const { id_user, name, surname, oldPassword, newPassword1, newPassword2 } = req.body;
		await new UserService(req).changePassword(id_user, name, surname, oldPassword, newPassword1, newPassword2);
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
 *     name: Login
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
 *             password:
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