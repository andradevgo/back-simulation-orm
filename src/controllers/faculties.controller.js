import { prisma } from '../db.js';

export const getFaculties = async (req, res) => {
  const faculties = await prisma.faculties.findMany();
  res.json(faculties);
};

export const createFaculty = async (req, res) => {
  const { Name } = req.body;
  const newFaculty = await prisma.faculties.create({
    data: {
      Name,
    },
  });
  res.json(newFaculty);
};
