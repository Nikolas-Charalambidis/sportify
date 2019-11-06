import { Router } from 'express';
import AuthService from "./authService";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
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
 *       403:
 *         description: Unverified email
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
 *       - Auth
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
 *         description: Reset link sent
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Email not found
 *       500:
 *         description: Token generating failed
 *       502:
 *         description: Unable to send email
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
 *       - Auth
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
 *         description: Password was changed
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Token not found
 *       498:
 *         description: Expired token
 *       500:
 *         description: Password reset failed
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
 *       - Auth
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
 *         description: Token expired
 *       500:
 *         description: Email confirmation failed
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

/**
 * @swagger
 * /auth/resendToken:
 *   post:
 *     tags:
 *       - Auth
 *     name: Login
 *     summary: Resend token
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
 *             type:
 *               type: string
 *     responses:
 *       201:
 *         description: Token resent
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Invalid token
 *       500:
 *         description: Token resending failed
 */
router.post('/resendToken', async (req, res, next) => {
	try {
		const { id_token, type } = req.body;
		console.log("data", { id_token, type });
		await new AuthService(req).resendToken(id_token, type);
		res.status(201).json({ error: false, msg: 'OK'});
	} catch(e) {
		next(e);
	}
});

export default router;
