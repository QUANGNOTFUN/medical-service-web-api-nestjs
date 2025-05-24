-- AlterTable
ALTER TABLE "Doctors" ALTER COLUMN "qualifications" DROP NOT NULL,
ALTER COLUMN "work_seniority" DROP NOT NULL,
ALTER COLUMN "specialty" DROP NOT NULL,
ALTER COLUMN "hospital" DROP NOT NULL;
