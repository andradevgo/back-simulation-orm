import { Router } from 'express';
import {
  createRole,
  getRole,
  getRoles,
} from '../controllers/roles.controller.js';

const router = Router();

router.get('/roles', getRoles);
router.get('/roles/:id', getRole);
router.post('/roles', createRole);

export default router;
