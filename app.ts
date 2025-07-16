import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ HERE!

import userRoutes from './routes/user.routes';
import applicantRoutes from './routes/applicant.routes';
import employerRoutes from './routes/employer.routes';
import jobRoutes from './routes/job.routes';
import applicationRoutes from './routes/application.routes';
import authRoutes from "./routes/auth.routes";

import { swaggerOptions } from './swagger';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/jobs', jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);

export default app;
