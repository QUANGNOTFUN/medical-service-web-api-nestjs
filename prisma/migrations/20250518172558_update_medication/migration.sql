/*
  Warnings:

  - Added the required column `price` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;
