import { prisma } from '../db.js';

export const getFaculties = async (req, res) => {
  const faculties = await prisma.faculties.findMany();
  res.json(faculties);
};
