import { prisma } from '../db.js';
import { calculateAge } from '../utils/calculateAge.js';

export const getStudents = async (req, res) => {
  try {
    const students = await prisma.students.findMany({
      include: {
        Program: true,
        User: true,
      },
    });

    const response = students.map((student) => ({
      id: student.Id,
      user_id: student.User_Id,
      student_name: student.User.Name,
      status: student.Status,
      program: student.Program.Name,
    }));

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.students.findFirst({
      where: {
        User_Id: +id,
      },
    });
    return res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentSubjects = async (req, res) => {
  const { id } = req.params;
  try {
    const studentSubjects = await prisma.enrollments.findMany({
      where: {
        Student_Id: +id,
      },
      include: {
        Subjects: true,
      },
    });
    return res
      .status(200)
      .json(studentSubjects.map((student) => student.Subjects));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const createStudent = async (req, res) => {
//   try {
//     const { Name, Birthdate, Document_Type, Document_Number, Program_Id } =
//       req.body;
//     const newStudent = await prisma.students.create({
//       data: {
//         Name,
//         Birthdate: new Date(Birthdate),
//         Document_Type,
//         Document_Number,
//         Program_Id: +Program_Id,
//       },
//     });
//     return res.status(201).json(newStudent);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// };
export const createStudent = async (req, res) => {
  const { User_Id, Program_Id } = req.body;
  try {
    const userExist = await prisma.users.findFirst({
      where: {
        Id: +User_Id,
      },
    });

    const programExist = await prisma.programs.findFirst({
      where: {
        Id: +Program_Id,
      },
    });

    const userIsStudent = await prisma.user_Roles.findFirst({
      where: {
        User_Id: +User_Id,
        Role_Id: 2,
      },
    });

    if (!userExist) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!programExist) {
      return res.status(404).json({ message: 'Program not found' });
    }

    if (userIsStudent) {
      const newStudent = await prisma.students.create({
        data: {
          User_Id: +User_Id,
          Program_Id: +Program_Id,
        },
      });
      return res.status(201).json(newStudent);
    } else {
      return res.status(401).json({ message: 'User is not a student' });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
