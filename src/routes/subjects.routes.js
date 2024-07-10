import { Router } from 'express';
import {
  createSubject,
  getStudentsBySubject,
  getSubject,
  getSubjects,
  getSubjectsByProgram,
} from '../controllers/subjects.controller.js';

const router = Router();

router.get('/subjects', getSubjects);
router.get('/subjects/:id', getSubject);
router.get('/subjects/:id/:division/students', getStudentsBySubject);
router.get('/subjects/:program_id/program', getSubjectsByProgram);
router.post('/subjects', createSubject);

export default router;
