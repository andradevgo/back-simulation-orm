import { Router } from 'express';
import { signin, signup, verifyToken } from '../controllers/auth.controller.js';

const router = Router();

router.get('/verify', verifyToken);

router.post('/signup', signup);
router.post('/signin', signin);

export default router;
