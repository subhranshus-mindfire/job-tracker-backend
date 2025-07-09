import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controllers';
import { authorize, protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', createUser);
router.get('/', protect, authorize("admin"), getUsers);
router.get('/:id', getUser);
router.put('/:id', protect, updateUser)
router.delete('/:id', protect, deleteUser)

export default router;
