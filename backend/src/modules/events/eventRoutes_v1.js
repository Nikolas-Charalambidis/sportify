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
 *     summary: Verify user email and password
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
 * /events/{id_event}:
 *   delete:
 *     tags:
 *       - Events
 *     name: Events
 *     summary: Verify user email and password
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - name: id_event
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Event added
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
