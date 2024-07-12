/*
  Warnings:

  - The primary key for the `Students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[User_Id]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Email` to the `Users` table without a default value. This is not possible if the table is not empty.

*/

-- Desactivar la verificación de claves foráneas
SET CONSTRAINTS ALL DEFERRED;

-- Eliminar la clave primaria en la tabla "Students" con CASCADE
ALTER TABLE "Students" DROP CONSTRAINT "Students_pkey" CASCADE;

-- AlterTable: Realizar otros cambios en la tabla "Students"
ALTER TABLE "Students" ADD COLUMN "Id" SERIAL NOT NULL;

-- Vuelve a crear la clave primaria en la tabla "Students"
ALTER TABLE "Students" ADD CONSTRAINT "Students_pkey" PRIMARY KEY ("Id");

-- Crear un índice único en la columna "User_Id" en la tabla "Students"
CREATE UNIQUE INDEX "Students_User_Id_key" ON "Students"("User_Id");

-- AlterTable: Agregar la columna "Email" en la tabla "Users"
ALTER TABLE "Users" ADD COLUMN "Email" TEXT NOT NULL;

-- Crear un índice único en la columna "Email" en la tabla "Users"
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- Reactivar la verificación de claves foráneas
SET CONSTRAINTS ALL IMMEDIATE;
