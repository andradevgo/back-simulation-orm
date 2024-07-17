import { Router } from 'express';
import {
  createEnrollment,
  deleteEnrollment,
  getEnrollment,
  getEnrollments,
  getEnrollmentsStudent,
  updateEnrollment,
} from '../controllers/enrollments.controller.js';

const router = Router();

router.get('/enrollments', getEnrollments);
router.get('/enrollments/student', getEnrollmentsStudent);
router.post('/enrollments', createEnrollment);
router.put('/enrollments/:id', updateEnrollment);
router.get('/enrollments/:id', getEnrollment);
router.delete('/enrollments/:id', deleteEnrollment);

export default router;
