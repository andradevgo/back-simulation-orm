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

export const createSubject = async (req, res) => {
  const { Name, Clasroom, Credits, Slots, Program_Id } = req.body;
  try {
    const newSubject = await prisma.subjects.create({
      data: {
        Name,
        Clasroom,
        Credits: +Credits,
        Slots: +Slots,
        Program_Id: +Program_Id,
      },
    });
    res.json(newSubject);
  } catch (error) {}
};

export const getStudentsBySubject = async (req, res) => {
  const { id, division } = req.params;
  console.log(id);
  try {
    const students = await prisma.students.findMany({
      where: {
        Enrollments: {
          some: {
            Subject_Id: +id,
            Subject_group: +division,
          },
        },
      },
    });
    const studentsCount = await prisma.students.count({
      where: {
        Enrollments: {
          some: {
            Subject_Id: +id,
            Subject_group: +division,
          },
        },
      },
    });
    res.json(students);
    console.log(studentsCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
