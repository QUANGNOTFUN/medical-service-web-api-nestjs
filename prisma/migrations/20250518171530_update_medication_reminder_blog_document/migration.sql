/*
  Warnings:

  - The primary key for the `Medication` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `medication_id` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `medication_name` on the `Medication` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Medication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Medication_medication_name_key";

-- AlterTable
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_pkey",
DROP COLUMN "medication_id",
DROP COLUMN "medication_name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Medication_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Medication_name_key" ON "Medication"("name");
