import { prisma } from '../db.js';

export const getFaculties = async (req, res) => {
  const faculties = await prisma.faculties.findMany();
  res.json(faculties);
};

export const createFaculty = async (req, res) => {
  const { Name } = req.body;
  try {
    const newFaculty = await prisma.faculties.create({
      data: {
        Name,
      },
    });
    res.json(newFaculty);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
