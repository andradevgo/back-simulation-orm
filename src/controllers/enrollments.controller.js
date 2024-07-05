import { prisma } from '../db.js';

export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await prisma.enrollments.findMany({
      include: {
        Students: true,
        Subjects: true,
      },
    });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrollment = async (req, res) => {
  const { id } = req.params;

  const enrollment = await prisma.enrollments.findFirst({
    where: {
      Id: parseInt(id),
    },
    include: {
      Students: true,
      Subjects: true,
    },
  });
  res.json(enrollment);
  const {
    Students: { Id: studentId },
  } = enrollment;
  console.log(studentId);
  const studentName = await prisma.students.findFirst({
    where: {
      Id: studentId,
    },
  });
  console.log(studentName.Name);
};

export const createEnrollment = async (req, res) => {
  try {
    const newEnrollment = await prisma.enrollments.create({
      data: {
        Subject_Id: req.body.Subject_Id,
        Student_Id: req.body.Student_Id,
      },
    });
    res.json(newEnrollment);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
