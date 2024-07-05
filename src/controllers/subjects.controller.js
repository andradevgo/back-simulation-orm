import { prisma } from '../db.js';

export const getSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subjects.findMany();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubject = async (req, res) => {
  const { id } = req.params;
  try {
    const subjects = await prisma.subjects.findFirst({
      where: {
        Id: +id,
      },
    });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
