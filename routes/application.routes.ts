
import { Router } from 'express';
import {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
  getApplicationsByApplicant,
  updateApplicationStatus,
} from '../controllers/application.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

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
 *         description: Application created successfully
 *       400:
 *         description: Bad request or duplicate
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
 *         description: Forbidden
 */
router.get('/', protect, authorize('employer'), getApplications);

/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Get application by ID
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
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', protect, authorize('employer'), getApplication);

/**
 * @swagger
 * /api/applications/{id}:
 *   put:
 *     summary: Update an application by ID
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
 *       description: Update fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application updated
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', protect, authorize('employer'), updateApplication);

/**
 * @swagger
 * /api/applications/{id}:
 *   delete:
 *     summary: Delete an application by ID
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
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', protect, authorize('applicant'), deleteApplication);

/**
 * @swagger
 * /api/applications/applicant/{applicantId}:
 *   get:
 *     summary: Get all applications by applicant ID
 *     tags: [Applications]
 *     parameters:
 *       - name: applicantId
 *         in: path
 *         description: Applicant ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of applications for the applicant
 *       404:
 *         description: Not found
 */
router.get('/applicant/:applicantId', protect, authorize('applicant'), getApplicationsByApplicant);


/**
 * @swagger
 * /api/applications/{applicationId}:
 *   patch:
 *     summary: Update application status by ID
 *     tags: [Applications]
 *     parameters:
 *       - name: applicationId
 *         in: path
 *         description: Application ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application status updated
 *       404:
 *         description: Not found
 */
router.patch('/:id', protect, updateApplicationStatus);

export default router;
