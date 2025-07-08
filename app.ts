import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import applicantRoutes from './routes/applicant.routes';
import employerRoutes from './routes/employer.routes';
import jobRoutes from './routes/job.routes';



dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/jobs', jobRoutes);



export default app;
