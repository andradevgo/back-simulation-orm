-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_User_Id_fkey";

-- DropForeignKey
ALTER TABLE "User_Roles" DROP CONSTRAINT "User_Roles_User_Id_fkey";

-- AddForeignKey
ALTER TABLE "User_Roles" ADD CONSTRAINT "User_Roles_User_Id_fkey" FOREIGN KEY ("User_Id") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_User_Id_fkey" FOREIGN KEY ("User_Id") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
