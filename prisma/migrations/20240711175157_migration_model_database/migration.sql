-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Student_Id_fkey" FOREIGN KEY ("Student_Id") REFERENCES "Students"("User_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
