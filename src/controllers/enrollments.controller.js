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
  const enrollmentSubjectCount = await prisma.enrollments.count({
    where: {
      Subject_Id: enrollment.Subject_Id,
    },
  });
  console.log('Cupos inscritos ' + enrollmentSubjectCount);
  res.json(enrollment);
};

export const createEnrollment = async (req, res) => {
  const { Subject_Id, Student_Id } = req.body;
  try {
    const getSubjectEnrollment = await prisma.subjects.findFirst({
      where: {
        Id: +Subject_Id,
      },
    });
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
          { Student_Id: +Student_Id },
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
          Student_Id: +Student_Id,
        },
      });
      return res.status(200).json(newEnrollment);
    } else if (!gotSlots && subjectsSameId.length < 4) {
      const newSubject = await prisma.subjects.create({
        data: {
          ...getSubjectEnrollment,
          Id: undefined,
          OriginalSubjectId: +Subject_Id,
        },
      });
      const firstEnrollmentNew = await prisma.enrollments.create({
        data: {
          Subject_Id: newSubject.Id,
          Student_Id: +Student_Id,
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
  await res.json({ message: 'deleteEnrollment' });
};
