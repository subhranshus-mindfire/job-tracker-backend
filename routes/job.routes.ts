import { Router } from 'express';
import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getEmployerJobs
} from '../controllers/job.controller';
import { authorize, protect } from '../middlewares/auth.middleware';
import { Application } from '../models/Application';

const router = Router();

router.get("/my/:empID", protect, authorize('employer'), getEmployerJobs);



/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Manage job postings by employers
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Job data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employer
 *               - job_role
 *               - description
 *               - job_type
 *               - location
 *             properties:
 *               employer:
 *                 type: string
 *                 description: Employer ID
 *               job_role:
 *                 type: string
 *               description:
 *                 type: string
 *               job_type:
 *                 type: string
 *                 example: On-Site
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only employers can create
 */
router.post('/', protect, authorize('employer'), createJob);

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all job postings
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 */
router.get('/', getJobs);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get a single job posting by ID
 *     tags: [Jobs]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job found
 *       404:
 *         description: Not found
 */
router.get('/:id', getJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update a job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated job data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_role:
 *                 type: string
 *               description:
 *                 type: string
 *               job_type:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only employer can update
 *       404:
 *         description: Not found
 */
router.put('/:id', protect, authorize('employer'), updateJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete a job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       203:
 *         description: Job deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only employer can delete
 *       404:
 *         description: Not found
 */
router.delete('/:id', protect, authorize('employer'), deleteJob);

router.get('/:id/applicants', async (req, res) => {
  const jobId = req.params.id;
  const applications = await Application.find({ job: jobId })
    .populate({
      path: "applicant",
      populate: {
        path: "user"
      }
    }); res.json({ success: true, data: applications });
});

export default router;
