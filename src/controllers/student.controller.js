import { prisma } from '../db.js';

export const getStudents = async (req, res) => {
  try {
    const students = await prisma.students.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.students.findFirst({
      where: {
        Id: +id,
      },
    });
    return res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { Name, Birthdate, Document_Type, Document_Number, Program_Id } =
      req.body;
    const newStudent = await prisma.students.create({
      data: {
        Name,
        Birthdate: new Date(Birthdate),
        Document_Type,
        Document_Number,
        Program_Id: +Program_Id,
      },
    });
    return res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
