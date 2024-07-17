import { Router } from 'express';
import {
  createProgram,
  deleteProgram,
  getProgram,
  getProgramByStudent,
  getPrograms,
  updateProgram,
} from '../controllers/programs.controller.js';

const router = Router();

router.get('/programs', getPrograms);

router.get('/programs/:id', getProgram);

router.get('/program/student/:id', getProgramByStudent);

router.put('/programs/:id', updateProgram);

router.post('/programs', createProgram);

router.delete('/programs', deleteProgram);

export default router;
