-- CreateTable
CREATE TABLE "Subjects" (
    "Id" SERIAL NOT NULL,
    "Division" INTEGER NOT NULL DEFAULT 60,
    "Name" TEXT NOT NULL,
    "Classroom" TEXT,
    "Credits" INTEGER,
    "Registration_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Status" TEXT NOT NULL DEFAULT 'a',
    "Slots" INTEGER,
    "Program_Id" INTEGER,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Students" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Photo" TEXT DEFAULT 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    "Birthdate" TIMESTAMP(3),
    "Document_Type" TEXT,
    "Document_Number" TEXT NOT NULL,
    "Registration_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Status" TEXT NOT NULL DEFAULT 'a',
    "Program_Id" INTEGER,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Enrollments" (
    "Id" SERIAL NOT NULL,
    "Subject_Id" INTEGER NOT NULL,
    "Subject_group" INTEGER NOT NULL DEFAULT 60,
    "Student_Id" INTEGER NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Status" TEXT NOT NULL DEFAULT 'a',

    CONSTRAINT "Enrollments_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Faculties" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Faculties_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Programs" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "Programs_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subjects_Id_Division_key" ON "Subjects"("Id", "Division");

-- CreateIndex
CREATE UNIQUE INDEX "Students_Document_Number_key" ON "Students"("Document_Number");

-- AddForeignKey
ALTER TABLE "Subjects" ADD CONSTRAINT "Subjects_Program_Id_fkey" FOREIGN KEY ("Program_Id") REFERENCES "Programs"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_Program_Id_fkey" FOREIGN KEY ("Program_Id") REFERENCES "Programs"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Subject_Id_Subject_group_fkey" FOREIGN KEY ("Subject_Id", "Subject_group") REFERENCES "Subjects"("Id", "Division") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Student_Id_fkey" FOREIGN KEY ("Student_Id") REFERENCES "Students"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programs" ADD CONSTRAINT "Programs_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
