import { Router } from 'express';
import AuthService from "./authService";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Verify user email and password
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
 *     responses:
 *       200:
 *         description: User authenticated, JWT returned
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const { user, token } = await new AuthService(req).login(email, password);
		res.status(200).json({ error: false, msg: 'OK', user: user, token: token});
	} catch(e) {
		next(e);
	}

});

/**
 * @swagger
 * /auth/resetLink:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Send link for password reset
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
 *     responses:
 *       200:
 *         description: User authenticated, JWT returned
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.post('/resetLink', async (req, res, next) => {
	try {
		const { email } = req.body;
		await new AuthService(req).genResetToken(email);
		res.status(201).json({ error: false, msg: 'OK'});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /auth/resetPassword:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Reset user password
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
 *             hash:
 *               type: integer
 *             password1:
 *               type: string
 *             password2:
 *               type: string
 *     responses:
 *       200:
 *         description: User authenticated, JWT returned
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.post('/resetPassword', async (req, res, next) => {
	try {
		const { id_user, hash, password1, password2 } = req.body;
		await new AuthService(req).resetPassword(id_user, hash, password1, password2);
		res.status(200).json({ error: false, msg: 'OK'});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /auth/confirmEmail:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Verify user's email
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
 *             hash:
 *               type: string
 *     responses:
 *       200:
 *         description: Email verified, returned user object
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Invalid token
 *       498:
 *         description: Token expiredW
 */
router.post('/confirmEmail', async (req, res, next) => {
	try {
		const { id_user, hash } = req.body;
		const user = await new AuthService(req).confirmEmail(id_user, hash);
		res.status(200).json({ error: false, msg: 'OK', user: user});
	} catch(e) {
		next(e);
	}
});

export default router;
