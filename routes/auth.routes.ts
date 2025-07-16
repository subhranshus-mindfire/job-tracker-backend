import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       description: User info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [applicant, employer]
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Bad request
 */

router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       description: Credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       203:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */

router.post('/login', login);

router.get("/me", protect, (req, res) => {
  // @ts-ignore
  res.status(200).json(req.user);
});



export default router;
