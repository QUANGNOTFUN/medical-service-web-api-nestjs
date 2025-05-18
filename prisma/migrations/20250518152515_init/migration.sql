/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Account_id_key";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "plan_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "qualifications" TEXT NOT NULL,
    "work_eniority" INTEGER NOT NULL,
    "specialty" TEXT NOT NULL,
    "hospital" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorSchedule" (
    "id" SERIAL NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DoctorSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "appointment_type" TEXT NOT NULL,
    "appointment_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "is_anonymous" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentPlan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hiv_diagnosis_date" TIMESTAMP(3),
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TreatmentPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExaminationReport" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "risk_assessment" TEXT NOT NULL,
    "is_HIV" BOOLEAN NOT NULL,
    "HIV_test_file" TEXT NOT NULL,
    "regimen_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExaminationReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regimen" (
    "id" SERIAL NOT NULL,
    "care_stage" TEXT NOT NULL,
    "regimen_type" TEXT NOT NULL,
    "medication_lits" TEXT NOT NULL,
    "user_guide" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Regimen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "medication_id" SERIAL NOT NULL,
    "medication_name" TEXT NOT NULL,
    "available_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("medication_id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "reminder_id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "reminder_type" TEXT NOT NULL,
    "reminder_time" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("reminder_id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "post_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "Document" (
    "document_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "uploaded_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "DashboardReport" (
    "report_id" SERIAL NOT NULL,
    "report_type" TEXT NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DashboardReport_pkey" PRIMARY KEY ("report_id")
);

-- CreateTable
CREATE TABLE "_ExaminationReportToTreatmentPlan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExaminationReportToTreatmentPlan_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_user_id_key" ON "Patient"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_user_id_key" ON "Doctor"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Medication_medication_name_key" ON "Medication"("medication_name");

-- CreateIndex
CREATE INDEX "_ExaminationReportToTreatmentPlan_B_index" ON "_ExaminationReportToTreatmentPlan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "TreatmentPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorSchedule" ADD CONSTRAINT "DoctorSchedule_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "DoctorSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationReport" ADD CONSTRAINT "ExaminationReport_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationReport" ADD CONSTRAINT "ExaminationReport_regimen_id_fkey" FOREIGN KEY ("regimen_id") REFERENCES "Regimen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExaminationReportToTreatmentPlan" ADD CONSTRAINT "_ExaminationReportToTreatmentPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "ExaminationReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExaminationReportToTreatmentPlan" ADD CONSTRAINT "_ExaminationReportToTreatmentPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "TreatmentPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
