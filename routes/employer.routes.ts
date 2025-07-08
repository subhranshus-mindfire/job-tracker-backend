import { Router } from 'express';
import {
  createEmployer,
  getEmployers,
  getEmployer,
  updateEmployer,
  deleteEmployer
} from '../controllers/employer.controller';

const router = Router()

router.post('/', createEmployer);
router.get('/', getEmployers);
router.get('/:id', getEmployer);
router.put('/:id', updateEmployer);
router.delete('/:id', deleteEmployer);

export default router
