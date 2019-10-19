import express from 'express';

const users = (api) => {

	const router = express.Router();
	api.use('/api/v1', router);

	/**
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
	const data = [
		{
			id_user: 1,
			email: 'user01@sportify.cz',
			password: 'password',
			name: 'User',
			surname: '01'
		}, {
			id_user: 2,
			email: 'user02@sportify.cz',
			password: 'password',
			name: 'User',
			surname: '02'
		}
	];

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
	 *       404:
	 *         description: User not found
	 */
	router.get('/users/:id_user', (req, res, next) => {
		const {id_user} = req.params;
		const user = data.find(user => Number(user.id_user) === Number(id_user));
		if (!user) {
			res.status(404);
			res.json({});
			return;
		}
		res.json(user);
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
	router.use('/users', (req, res, next) => {
		res.json(data);
	});
};

export default users;