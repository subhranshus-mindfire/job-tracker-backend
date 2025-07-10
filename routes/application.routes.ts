import { Router } from 'express';
import {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication
} from '../controllers/application.controller';
import { authorize, protect } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job Applications management
 */

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Apply for a job
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - job
 *               - applicant
 *               - status
 *             properties:
 *               job:
 *                 type: string
 *                 description: Job ID
 *               applicant:
 *                 type: string
 *                 description: Applicant ID
 *               status:
 *                 type: string
 *                 example: pending
 *     responses:
 *       201:
 *         description: Application created
 *       400:
 *         description: Bad request or already applied
 *       401:
 *         description: Unauthorized
 */
router.post('/', protect, authorize('applicant'), createApplication);

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of applications
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only employer can see all applications
 */
router.get('/', protect, authorize('employer'), getApplications);

/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Get a specific application by ID
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Application ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only employer can view
 *       404:
 *         description: Not found
 */
router.get('/:id', protect, authorize('employer'), getApplication);

/**
 * @swagger
 * /api/applications/{id}:
 *   put:
 *     summary: Update an application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Application ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: accepted
 *     responses:
 *       200:
 *         description: Application updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only employer can update
 *       404:
 *         description: Not found
 */
router.put('/:id', protect, authorize('employer'), updateApplication);

/**
 * @swagger
 * /api/applications/{id}:
 *   delete:
 *     summary: Delete an application 
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Application ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       203:
 *         description: Application deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only applicant can delete
 *       404:
 *         description: Not found
 */
router.delete('/:id', protect, authorize('applicant'), deleteApplication);

export default router;
