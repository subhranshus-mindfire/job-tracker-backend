import { Router } from "express";
import { createApplicant, deleteApplicant, getApplicant, getApplicants, hasApplied, updateApplicant } from "../controllers/applicant.controller";
import { authorize, protect, verifySelf } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Applicants
 *   description: API endpoints for managing job applicants
 */


router.get("/:applicantId/has-applied/:jobId", protect, authorize("applicant"), hasApplied);

/**
 * @swagger
 * /api/applicants:
 *   get:
 *     summary: Get all applicants
 *     tags: [Applicants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of applicants
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only admin can view all applicants
 */
router.get("/", protect, authorize("employer"), getApplicants);

/**
 * @swagger
 * /api/applicants:
 *   post:
 *     summary: Create a new applicant profile
 *     tags: [Applicants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - skills
 *             properties:
 *               user_id:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Applicant created
 *       400:
 *         description: Bad request
 */
router.post("/", createApplicant);

/**
 * @swagger
 * /api/applicants/{id}:
 *   get:
 *     summary: Get a specific applicant by ID
 *     tags: [Applicants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Applicant ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Applicant found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only employer can view this
 *       404:
 *         description: Applicant not found
 */
router.get("/:id", protect, authorize("employer"), getApplicant);

/**
 * @swagger
 * /api/applicants/{id}:
 *   put:
 *     summary: Update an applicant
 *     tags: [Applicants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Applicant ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Applicant updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only applicant can update their own data
 *       404:
 *         description: Applicant not found
 */
router.put("/:id", protect, authorize("applicant"), verifySelf, updateApplicant);

/**
 * @swagger
 * /api/applicants/{id}:
 *   delete:
 *     summary: Delete an applicant
 *     tags: [Applicants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Applicant ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       203:
 *         description: Applicant deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only applicant can delete themselves
 *       404:
 *         description: Applicant not found
 */
router.delete("/:id", protect, authorize("applicant"), verifySelf, deleteApplicant);

export default router