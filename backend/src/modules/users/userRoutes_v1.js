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
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ error: true, msq: 'Missing params' });
	}
	const result = await new UserService(req).login(email, password);
	if(result.length === 0){
		return res.status(404).json({ error: true, msq: 'User not found' });
	} else if(result.length > 1){
		return res.status(404).json({ error: true, msq: 'Returned more than one record' });
	}
	const { id_user } = result[0];
	res.status(200)
		.header('Location' , `/api/v1/teams/${id_user}`)
		.json({ error: false, msq: 'OK', id_user: id_user, email: email });
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
router.get('/:user_id', async(req, res, next) => {
	const { user_id } = req.params;
	const id_user = Number(user_id);
	if (!id_user) {
		return res.status(400).json({ error: true, msq: 'Wrong input' });
	}
	const user = await new UserService(req).findUserById(id_user);
	if (user.length === 0) {
		return res.status(404).json({ error: true, msq: 'User not found' });
	}
	await res.json(user);
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
	await res.json(users);
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
	const { email, password, name, surname } = req.body;

	if(!email || !password || !name || !surname){
		res.status(400);
		await res.json({ error: true, msq: 'Missing data' });
		return;
	}
	const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
	if(!emailRegex.test(email)){
		return res.status(400).json({ error: true, msq: 'Invalid email' });
	}
	const emailExists = await new UserService(req).isEmailUsed(email);
	if(emailExists){
		return res.status(400).json({ error: true, msq: 'Email already exists' });
	}
	const id = await new UserService(req).addNewUser(email, password, name, surname);
	res.status(201).header('Location' , `/api/v1/users/${id}`).send({ error: false, msq: 'OK'});
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
 */

export default router;
