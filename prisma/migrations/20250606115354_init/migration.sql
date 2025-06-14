-- DropForeignKey
ALTER TABLE "Doctors" DROP CONSTRAINT "Doctors_id_fkey";

-- AlterTable
ALTER TABLE "Doctors" ALTER COLUMN "gender" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
