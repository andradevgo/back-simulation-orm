import { Router } from 'express';
import {
  createEnrollment,
  deleteEnrollment,
  getEnrollment,
  getEnrollments,
  updateEnrollment,
} from '../controllers/enrollments.controller.js';

const router = Router();

router.get('/enrollments', getEnrollments);
router.get('/enrollments/:id', getEnrollment);
router.post('/enrollments', createEnrollment);
router.put('/enrollments/:id', updateEnrollment);
router.delete('/enrollments/:id', deleteEnrollment);

export default router;
