import { Router } from 'express';
import {
  createEmployer,
  getEmployers,
  getEmployer,
  updateEmployer,
  deleteEmployer
} from '../controllers/employer.controller';
import { authorize, protect, verifySelf } from '../middlewares/auth.middleware';

const router = Router()


/**
 * @swagger
 * tags:
 *   name: Employers
 *   description: Manage employers (company profiles linked to a user)
 */

/**
 * @swagger
 * /api/employers:
 *   post:
 *     summary: Create an employer profile
 *     tags: [Employers]
 *     requestBody:
 *       description: Employer info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID linked to the employer
 *     responses:
 *       201:
 *         description: Employer created
 *       400:
 *         description: Employer already exists or invalid input
 */
router.post('/', createEmployer);

/**
 * @swagger
 * /api/employers:
 *   get:
 *     summary: Get all employers 
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employers
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only admin can access
 */
router.get('/', getEmployers);

/**
 * @swagger
 * /api/employers/{id}:
 *   get:
 *     summary: Get an employer by ID
 *     tags: [Employers]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Employer ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employer found
 *       404:
 *         description: Not found
 */
router.get('/:id', getEmployer);

/**
 * @swagger
 * /api/employers/{id}:
 *   put:
 *     summary: Update employer profile 
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Employer ID
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
 *               user:
 *                 type: string
 *                 description: Updated linked user ID
 *     responses:
 *       200:
 *         description: Employer updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only employer can update
 *       404:
 *         description: Not found
 */
router.put('/:id', protect, authorize('employer'), verifySelf, updateEmployer);

/**
 * @swagger
 * /api/employers/{id}:
 *   delete:
 *     summary: Delete employer profile 
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Employer ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       203:
 *         description: Employer deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only employer can delete
 *       404:
 *         description: Not found
 */
router.delete('/:id', protect, authorize('employer'), verifySelf, deleteEmployer);

export default router
