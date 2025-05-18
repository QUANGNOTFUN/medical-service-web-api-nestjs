/*
  Warnings:

  - The primary key for the `BlogPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_id` on the `BlogPost` table. All the data in the column will be lost.
  - The primary key for the `DashboardReport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `report_id` on the `DashboardReport` table. All the data in the column will be lost.
  - You are about to drop the column `report_type` on the `DashboardReport` table. All the data in the column will be lost.
  - The primary key for the `Document` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `document_id` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `medication_lits` on the `Regimen` table. All the data in the column will be lost.
  - The primary key for the `Reminder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reminder_id` on the `Reminder` table. All the data in the column will be lost.
  - Added the required column `type` to the `DashboardReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medication_list` to the `Regimen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_pkey",
DROP COLUMN "post_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DashboardReport" DROP CONSTRAINT "DashboardReport_pkey",
DROP COLUMN "report_id",
DROP COLUMN "report_type",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD CONSTRAINT "DashboardReport_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Document" DROP CONSTRAINT "Document_pkey",
DROP COLUMN "document_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Document_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Regimen" DROP COLUMN "medication_lits",
ADD COLUMN     "medication_list" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_pkey",
DROP COLUMN "reminder_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id");
