import { Router } from 'express';
import {
  createStudent,
  getStudent,
  getStudents,
} from '../controllers/student.controller.js';

const router = Router();

router.get('/students', getStudents);
router.get('/students/:id', getStudent);

router.post('/students', createStudent);

export default router;
