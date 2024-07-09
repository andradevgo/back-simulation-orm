import { Router } from 'express';
import { prisma } from '../db.js';
import {
  createFaculty,
  getFaculties,
} from '../controllers/faculties.controller.js';

const router = Router();

router.get('/faculties', getFaculties);

router.post('/faculties', createFaculty);

export default router;
