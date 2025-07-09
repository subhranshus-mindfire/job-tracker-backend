import { Router } from 'express';
import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
} from '../controllers/job.controller';
import { authorize, protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', protect, authorize("employer"), createJob);
router.get('/', getJobs);
router.get('/:id', getJob);
router.put('/:id', protect, authorize("employer"), updateJob);
router.delete('/:id', protect, authorize("employer"), deleteJob);

export default router;
