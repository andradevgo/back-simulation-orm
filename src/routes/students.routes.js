import { Router } from 'express';
import {
  createStudent,
  getStudent,
  getStudents,
  getStudentSubjects,
} from '../controllers/student.controller.js';

const router = Router();

router.get('/students', getStudents);
router.get('/students/:id', getStudent);
router.get('/students/:id/subjects', getStudentSubjects);
router.post('/students', createStudent);

export default router;
