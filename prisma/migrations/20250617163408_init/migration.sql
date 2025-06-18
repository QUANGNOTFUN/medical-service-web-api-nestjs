/*
  Warnings:

  - You are about to drop the column `schedule_id` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `slot_id` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Made the column `start_time` on table `DoctorSchedule` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_time` on table `DoctorSchedule` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_schedule_id_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "schedule_id",
ADD COLUMN     "slot_id" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "DoctorSchedule" ALTER COLUMN "start_time" SET NOT NULL,
ALTER COLUMN "end_time" SET NOT NULL;

-- AlterTable
ALTER TABLE "Doctors" ALTER COLUMN "qualifications" DROP NOT NULL,
ALTER COLUMN "specialty" DROP NOT NULL,
ALTER COLUMN "work_seniority" DROP NOT NULL,
ALTER COLUMN "hospital" DROP NOT NULL,
ALTER COLUMN "default_fee" DROP NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AppointmentSlot" (
    "id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "max_patients" INTEGER NOT NULL DEFAULT 6,
    "booked_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppointmentSlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppointmentSlot" ADD CONSTRAINT "AppointmentSlot_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "DoctorSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "AppointmentSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
