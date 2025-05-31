/*
  Warnings:

  - Changed the type of `risk_assessment` on the `ExaminationReport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ExaminationReport" DROP COLUMN "risk_assessment",
ADD COLUMN     "risk_assessment" TEXT NOT NULL;
