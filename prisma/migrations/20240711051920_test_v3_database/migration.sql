/*
  Warnings:

  - The primary key for the `Students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Birthdate` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `Document_Number` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `Document_Type` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `Photo` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `Registration_Date` on the `Students` table. All the data in the column will be lost.
  - Added the required column `User_Id` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Enrollments" DROP CONSTRAINT "Enrollments_Student_Id_fkey";

-- DropIndex
DROP INDEX "Students_Document_Number_key";

-- AlterTable
ALTER TABLE "Students" DROP CONSTRAINT "Students_pkey",
DROP COLUMN "Birthdate",
DROP COLUMN "Document_Number",
DROP COLUMN "Document_Type",
DROP COLUMN "Id",
DROP COLUMN "Name",
DROP COLUMN "Photo",
DROP COLUMN "Registration_Date",
ADD COLUMN     "User_Id" INTEGER NOT NULL,
ADD CONSTRAINT "Students_pkey" PRIMARY KEY ("User_Id");

-- CreateTable
CREATE TABLE "Users" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Photo" TEXT DEFAULT 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    "Birthdate" TIMESTAMP(3),
    "Document_Type" TEXT,
    "Document_Number" TEXT NOT NULL,
    "Registration_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Registration_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "User_Roles" (
    "Id" SERIAL NOT NULL,
    "User_Id" INTEGER NOT NULL,
    "Role_Id" INTEGER NOT NULL,
    "Registration_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Roles_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Document_Number_key" ON "Users"("Document_Number");

-- AddForeignKey
ALTER TABLE "User_Roles" ADD CONSTRAINT "User_Roles_User_Id_fkey" FOREIGN KEY ("User_Id") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Roles" ADD CONSTRAINT "User_Roles_Role_Id_fkey" FOREIGN KEY ("Role_Id") REFERENCES "Roles"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_User_Id_fkey" FOREIGN KEY ("User_Id") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Student_Id_fkey" FOREIGN KEY ("Student_Id") REFERENCES "Students"("User_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
