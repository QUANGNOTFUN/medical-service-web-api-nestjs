-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "CareStage" AS ENUM ('PrEP', 'PEP', 'ARV');

-- CreateEnum
CREATE TYPE "RegimenType" AS ENUM ('STANDARD', 'CUSTOM');

-- CreateTable
CREATE TABLE "TreatmentPlan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hiv_diagnosis_date" TIMESTAMP(3),
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "TreatmentPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExaminationReport" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "risk_assessment" "RiskLevel" NOT NULL,
    "is_HIV" BOOLEAN NOT NULL,
    "HIV_test_file" TEXT NOT NULL,
    "regimen_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "treatment_plan_id" INTEGER,

    CONSTRAINT "ExaminationReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regimen" (
    "id" SERIAL NOT NULL,
    "care_stage" TEXT NOT NULL,
    "regimen_type" TEXT NOT NULL,
    "medication_list" TEXT[],
    "user_guide" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Regimen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AppointmentToTreatmentPlan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AppointmentToTreatmentPlan_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AppointmentToTreatmentPlan_B_index" ON "_AppointmentToTreatmentPlan"("B");

-- AddForeignKey
ALTER TABLE "ExaminationReport" ADD CONSTRAINT "ExaminationReport_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationReport" ADD CONSTRAINT "ExaminationReport_regimen_id_fkey" FOREIGN KEY ("regimen_id") REFERENCES "Regimen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationReport" ADD CONSTRAINT "ExaminationReport_treatment_plan_id_fkey" FOREIGN KEY ("treatment_plan_id") REFERENCES "TreatmentPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppointmentToTreatmentPlan" ADD CONSTRAINT "_AppointmentToTreatmentPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Appointment"("appointment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppointmentToTreatmentPlan" ADD CONSTRAINT "_AppointmentToTreatmentPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "TreatmentPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
