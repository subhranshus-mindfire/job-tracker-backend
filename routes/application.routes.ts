import { Router } from 'express';
import {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication
} from '../controllers/application.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', protect, createApplication);
router.get('/', protect, getApplications);
router.get('/:id', protect, getApplication);
router.put('/:id', protect, updateApplication);
router.delete('/:id', protect, deleteApplication);

export default router;
