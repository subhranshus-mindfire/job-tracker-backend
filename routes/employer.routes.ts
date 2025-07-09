import { Router } from 'express';
import {
  createEmployer,
  getEmployers,
  getEmployer,
  updateEmployer,
  deleteEmployer
} from '../controllers/employer.controller';
import { authorize, protect } from '../middlewares/auth.middleware';

const router = Router()

router.post('/', createEmployer);
router.get('/', protect, authorize("admin"), getEmployers);
router.get('/:id', getEmployer);
router.put('/:id', protect, authorize("employer"), updateEmployer);
router.delete('/:id', protect, authorize("employer"), deleteEmployer);

export default router
