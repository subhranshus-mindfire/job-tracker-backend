import { Router } from 'express';
import {
  createEmployer,
  getEmployers,
  getEmployer,
  updateEmployer,
  deleteEmployer
} from '../controllers/employer.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router()

router.post('/', createEmployer);
router.get('/', protect, getEmployers);
router.get('/:id', getEmployer);
router.put('/:id', protect, updateEmployer);
router.delete('/:id', protect, deleteEmployer);

export default router
