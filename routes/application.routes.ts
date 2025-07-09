import { Router } from 'express';
import {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication
} from '../controllers/application.controller';

const router = Router();

router.post('/', createApplication);
router.get('/', getApplications);
router.get('/:id', getApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

export default router;
