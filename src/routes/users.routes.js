import { Router } from 'express';
import {
  createUser,
  getUser,
  getUsers,
  signout,
} from '../controllers/users.controller.js';
import {
  createUserRole,
  getUserRoles,
} from '../controllers/userRoles.controller.js';

const router = Router();

router.get('/roles', getUserRoles);
router.get('/', getUsers);
router.get('/:id', getUser);

router.post('/roles', createUserRole);
router.post('/', createUser);
router.post('/signout', signout);

export default router;
