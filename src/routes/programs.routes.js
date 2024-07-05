import { Router } from 'express';
import { prisma } from '../db.js';
import {
  createProgram,
  getProgram,
  getPrograms,
  updateProgram,
} from '../controllers/programs.controller.js';

const router = Router();

router.get('/programs', getPrograms);

router.get('/programs/:id', getProgram);

router.put('/programs/:id', updateProgram);

router.post('/programs', createProgram);

export default router;
