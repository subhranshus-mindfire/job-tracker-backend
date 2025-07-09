import { Router } from 'express';
import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
} from '../controllers/job.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', protect, createJob);
router.get('/', getJobs);
router.get('/:id', getJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

export default router;
