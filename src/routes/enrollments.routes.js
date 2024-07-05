import { Router } from 'express';
import {
  getEnrollment,
  getEnrollments,
} from '../controllers/enrollments.controller.js';

const router = Router();

router.get('/enrollments', getEnrollments);
router.get('/enrollments/:id', getEnrollment);

export default router;
