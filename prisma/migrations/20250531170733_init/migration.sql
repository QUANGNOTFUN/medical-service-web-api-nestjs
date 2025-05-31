/*
  Warnings:

  - The primary key for the `doctors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `doctors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "DoctorSchedule" DROP CONSTRAINT "DoctorSchedule_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "ExaminationReport" DROP CONSTRAINT "ExaminationReport_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_user_id_fkey";

-- DropIndex
DROP INDEX "doctors_user_id_key";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "doctor_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "DoctorSchedule" ALTER COLUMN "doctor_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ExaminationReport" ALTER COLUMN "doctor_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_pkey",
DROP COLUMN "user_id",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "doctors_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "doctors_id_seq";

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorSchedule" ADD CONSTRAINT "DoctorSchedule_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationReport" ADD CONSTRAINT "ExaminationReport_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
