import { Router } from 'express';
import EventService from "./eventService";

const router = Router();

/**
 * @swagger
 * /events/{id_event}:
 *   delete:
 *     tags:
 *       - Events
 *     name: Events
 *     summary: Delete event by Event ID
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - name: id_event
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Event not found
 *       500:
 *         description: Unexpected error
 */
router.delete('/:id_event', async (req, res, next) => {
	try {
		const { id_event } = req.params;
		await new EventService(req).deleteEvent(id_event);
		res.status(200).json({ error: false, msg: 'Event byl úspěšně odstraněn'});
	} catch(e) {
		next(e);
	}
});

/**
 * @swagger
 * /events/:
 *   post:
 *     tags:
 *       - Events
 *     name: Events
 *     summary: Add new event
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
 *             id_team:
 *               type: integer
 *             id_match:
 *               type: integer
 *             id_assistance1:
 *               type: integer
 *             id_assistance2:
 *               type: integer
 *             minute:
 *               type: integer
 *             value:
 *               type: integer
 *             host:
 *               type: boolean
 *     responses:
 *       201:
 *         description: Event added
 *       500:
 *         description: Unexpected error
 */
router.post('/', async (req, res, next) => {
	try {
		const {values} = req.body;
		await new EventService(req).addEvent(values);
		res.status(201).json({ error: false, msg: 'Event byl úspěšně přidán'});
	} catch(e) {
		next(e);
	}
});

export default router;
