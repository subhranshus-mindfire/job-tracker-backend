import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import applicantRoutes from './routes/applicant.routes';
import employerRoutes from './routes/employer.routes';
import jobRoutes from './routes/job.routes';
import applicationRoutes from './routes/application.routes'
import authRoutes from "./routes/auth.routes"
import { swaggerOptions } from './swagger';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';



dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/jobs', jobRoutes);
app.use("/api/applications", applicationRoutes)
app.use("/api/auth", authRoutes)

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



export default app;
