import { Router } from 'express';
import { getSubject, getSubjects } from '../controllers/subjects.controller.js';

const router = Router();

router.get('/subjects', getSubjects);
router.get('/subjects/:id', getSubject);

export default router;
