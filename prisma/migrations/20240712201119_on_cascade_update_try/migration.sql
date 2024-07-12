-- DropForeignKey
ALTER TABLE "Enrollments" DROP CONSTRAINT "Enrollments_Student_Id_fkey";

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Student_Id_fkey" FOREIGN KEY ("Student_Id") REFERENCES "Students"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
