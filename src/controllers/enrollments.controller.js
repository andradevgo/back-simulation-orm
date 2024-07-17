import { prisma } from '../db.js';
import jwt from 'jsonwebtoken';

export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await prisma.enrollments.findMany({
      include: {
        Students: true,
        Subjects: true,
      },
    });
    console.log(enrollments);

    const response = enrollments.map((enrollment) => ({
      id: enrollment.Id,
      subject_name: enrollment.Subjects.Name,
      student_name: enrollment.Students.Name,
      division: enrollment.Subject_group,
      enrollment_date: enrollment.Date,
    }));
    res.json(response);
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
  const enrollmentSubjectCount = await prisma.enrollments.count({
    where: {
      Subject_Id: enrollment.Subject_Id,
    },
  });
  console.log('Cupos inscritos ' + enrollmentSubjectCount);
  res.json(enrollment);
};

export const createEnrollment = async (req, res) => {
  const { Subject_Id } = req.body;
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await prisma.users.findFirst({
      where: {
        Id: decoded.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const getStudent = await prisma.students.findFirst({
      where: {
        User_Id: +user.Id,
      },
    });
    const getSubjectEnrollment = await prisma.subjects.findFirst({
      where: {
        Id: +Subject_Id,
      },
    });
    console.log(
      getSubjectEnrollment.Program_Id + 'Programad ID:' + getStudent.Program_Id
    );

    if (getSubjectEnrollment.Program_Id !== getStudent.Program_Id) {
      return res
        .status(400)
        .json({ message: 'No puedes inscribirte en esta materia' });
    }

    const subjectsSameId = await prisma.subjects.findMany({
      where: {
        OR: [
          {
            Id: +Subject_Id,
          },
          {
            OriginalSubjectId: +Subject_Id,
          },
        ],
      },
    });
    console.log(subjectsSameId.length);

    const studentsEnrolled = await prisma.enrollments.findMany({
      where: {
        AND: [
          { Student_Id: +getStudent.Id },
          {
            OR: [
              { Subject_Id: +Subject_Id },
              {
                Subjects: {
                  OriginalSubjectId: +Subject_Id,
                },
              },
            ],
          },
        ],
      },
    });

    if (studentsEnrolled.length > 0) {
      console.log(studentsEnrolled);
      return res
        .status(400)
        .json({ message: 'Ya te encuentras inscrito en esta materia' });
    }

    let gotSlots = false;
    let subjectWithSlots;
    const mappedSubjects = await Promise.all(
      subjectsSameId.map(async (subject) => {
        const subjectEnrollments = await prisma.enrollments.count({
          where: {
            Subject_Id: subject.Id,
          },
        });
        if (subjectEnrollments < subject.Slots) {
          gotSlots = true;
          console.log(subject.Id);
          subjectWithSlots = subject.Id;
        }
      })
    );
    console.log(gotSlots);
    console.log(subjectWithSlots);
    if (gotSlots) {
      const newEnrollment = await prisma.enrollments.create({
        data: {
          Subject_Id: subjectWithSlots,
          Student_Id: +getStudent.Id,
        },
      });
      return res.status(200).json(newEnrollment);
    } else if (!gotSlots && subjectsSameId.length < 4) {
      let group = getSubjectEnrollment.Division;
      let newGroup = subjectsSameId.length == 1 ? group + 1 : group + 2;
      const newSubject = await prisma.subjects.create({
        data: {
          ...getSubjectEnrollment,
          Id: undefined,
          Division: +newGroup,
          OriginalSubjectId: +Subject_Id,
        },
      });
      const firstEnrollmentNew = await prisma.enrollments.create({
        data: {
          Subject_Id: newSubject.Id,
          Subject_group: +newSubject.Division,
          Student_Id: +getStudent.Id,
        },
      });
      return res.status(200).json(firstEnrollmentNew);
    } else {
      return res.status(400).json({ message: 'No hay cupos disponibles' });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const updateEnrollment = async (req, res) => {
  await res.json({ message: 'updateEnrollment' });
};

export const deleteEnrollment = async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await prisma.enrollments.delete({
      where: {
        Id: +id,
      },
    });
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEnrollmentsStudent = async (req, res) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log({ decoded });

    const user = await prisma.users.findFirst({
      where: {
        Id: decoded.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const student = await prisma.students.findFirst({
      where: {
        User_Id: +user.Id,
      },
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const enrollments = await prisma.enrollments.findMany({
      where: {
        Student_Id: +student.Id,
      },
    });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
