import { Router } from 'express';
import {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication
} from '../controllers/application.controller';
import { authorize, protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', protect, authorize("applicant"), createApplication);
router.get('/', protect, authorize("employer"), getApplications);
router.get('/:id', protect, authorize("employer"), getApplication);
router.put('/:id', protect, authorize("employer"), updateApplication);
router.delete('/:id', protect, authorize("applicant"), deleteApplication);

export default router;
