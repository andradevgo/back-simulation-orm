import { Router } from 'express';
import { prisma } from '../db.js';
import { getFaculties } from '../controllers/faculties.controller.js';

const router = Router();

router.get('/faculties', getFaculties);

router.post('/faculties', async (req, res) => {
  const newFaculty = await prisma.faculties.create({ data: req.body });
  res.json(newFaculty);
});

export default router;
