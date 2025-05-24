-- CreateTable
CREATE TABLE "Doctors" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "qualifications" TEXT NOT NULL,
    "work_seniority" INTEGER NOT NULL,
    "specialty" TEXT NOT NULL,
    "hospital" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctors_user_id_key" ON "Doctors"("user_id");
