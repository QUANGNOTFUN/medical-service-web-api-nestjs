/*
  Warnings:

  - A unique constraint covering the columns `[acronym]` on the table `Medication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `acronym` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "acronym" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Medication_acronym_key" ON "Medication"("acronym");
