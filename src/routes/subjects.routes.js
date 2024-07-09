import { Router } from 'express';
import {
  createSubject,
  getStudentsBySubject,
  getSubject,
  getSubjects,
} from '../controllers/subjects.controller.js';

const router = Router();

router.get('/subjects', getSubjects);
router.get('/subjects/:id', getSubject);
router.get('/subjects/:id/:division/students', getStudentsBySubject);
router.post('/subjects', createSubject);

export default router;
