import { Router } from 'express';

import userService from './userService';

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
 *       404:
 *         description: User not found
 */
router.get('/:id_user', (req, res, next) => {
	const {id_user} = req.params;
	const user = userService.findUserById(id_user);
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
router.use('/', (req, res, next) => {
	res.json(userService.allUsers());
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

// Export the Router
export default router;