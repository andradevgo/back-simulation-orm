import { prisma } from '../db.js';

export const getPrograms = async (req, res) => {
  try {
    const programs = await prisma.programs.findMany();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgram = async (req, res) => {
  const { id } = req.params;
  const programs = await prisma.programs.findFirst({
    where: {
      Id: parseInt(id),
    },
    include: {
      Faculty: true,
    },
  });
  res.json(programs);
};

export const createProgram = async (req, res) => {
  const newProgram = await prisma.programs.create({
    data: {
      Name: req.body.Name,
      facultyId: +req.body.FacultyId,
    },
  });
  res.json(newProgram);
};

export const updateProgram = async (req, res) => {
  const { id } = req.params;

  const programUpdate = await prisma.programs.update({
    where: {
      Id: parseInt(id),
    },
    data: req.body,
  });
  return res.json(programUpdate);
};

export const deleteProgram = async (req, res) => {
  return res.json({ message: 'deleteProgram' });
};

export const getProgramByStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await prisma.students.findFirst({
      where: {
        Id: +id,
      },
      select: {
        Program: true,
      },
    });
    return res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
