import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import applicantRoutes from './routes/applicant.routes';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/applicants', applicantRoutes);


export default app;
