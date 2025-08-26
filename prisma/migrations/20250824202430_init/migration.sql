-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "gender" TEXT,
    "place_of_birth" TEXT,
    "hometown" TEXT,
    "nationality" TEXT,
    "ethnicity" TEXT,
    "religion" TEXT,
    "marital_status" TEXT,
    "health_status" TEXT,
    "avatar_url" CHAR(100),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "department_id" TEXT NOT NULL,
    "department_name" TEXT,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Position" (
    "position_id" TEXT NOT NULL,
    "position_name" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "PositionAssignment" (
    "id" SERIAL NOT NULL,
    "employee_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,

    CONSTRAINT "PositionAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAccount" (
    "employee_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "note" TEXT,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("employee_id","email")
);

-- CreateTable
CREATE TABLE "BonusDiscipline" (
    "id" SERIAL NOT NULL,
    "decision_number" TEXT,
    "reason" TEXT,
    "date" TIMESTAMP(3),
    "employee_id" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "BonusDiscipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Overtime" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "employee_id" TEXT NOT NULL,
    "overtime_type_id" INTEGER NOT NULL,

    CONSTRAINT "Overtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OvertimeType" (
    "overtime_type_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coefficient" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OvertimeType_pkey" PRIMARY KEY ("overtime_type_id")
);

-- CreateTable
CREATE TABLE "SalaryAdvance" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,

    CONSTRAINT "SalaryAdvance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timekeeping" (
    "timekeeping_id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "checkin" TIMESTAMP(3),
    "checkout" TIMESTAMP(3),
    "work_hours" DOUBLE PRECISION,
    "leave_hours" DOUBLE PRECISION,
    "employee_id" TEXT NOT NULL,
    "work_type_id" INTEGER NOT NULL,

    CONSTRAINT "Timekeeping_pkey" PRIMARY KEY ("timekeeping_id")
);

-- CreateTable
CREATE TABLE "WorkType" (
    "work_type_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coefficient" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("work_type_id")
);

-- CreateTable
CREATE TABLE "Allowance" (
    "allowance_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Allowance_pkey" PRIMARY KEY ("allowance_id")
);

-- CreateTable
CREATE TABLE "Employee_Allowance" (
    "id" SERIAL NOT NULL,
    "employee_id" TEXT NOT NULL,
    "allowance_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Employee_Allowance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insurance" (
    "insurance_id" SERIAL NOT NULL,
    "insurance_number" TEXT NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "employee_id" TEXT NOT NULL,

    CONSTRAINT "Insurance_pkey" PRIMARY KEY ("insurance_id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "contract_id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "sign_date" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "salary_level" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "contract_type" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("contract_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PositionAssignment_employee_id_department_id_position_id_key" ON "PositionAssignment"("employee_id", "department_id", "position_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_email_key" ON "UserAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_phone_key" ON "UserAccount"("phone");

-- AddForeignKey
ALTER TABLE "PositionAssignment" ADD CONSTRAINT "PositionAssignment_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionAssignment" ADD CONSTRAINT "PositionAssignment_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionAssignment" ADD CONSTRAINT "PositionAssignment_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusDiscipline" ADD CONSTRAINT "BonusDiscipline_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overtime" ADD CONSTRAINT "Overtime_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overtime" ADD CONSTRAINT "Overtime_overtime_type_id_fkey" FOREIGN KEY ("overtime_type_id") REFERENCES "OvertimeType"("overtime_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryAdvance" ADD CONSTRAINT "SalaryAdvance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timekeeping" ADD CONSTRAINT "Timekeeping_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timekeeping" ADD CONSTRAINT "Timekeeping_work_type_id_fkey" FOREIGN KEY ("work_type_id") REFERENCES "WorkType"("work_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Allowance" ADD CONSTRAINT "Employee_Allowance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Allowance" ADD CONSTRAINT "Employee_Allowance_allowance_id_fkey" FOREIGN KEY ("allowance_id") REFERENCES "Allowance"("allowance_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insurance" ADD CONSTRAINT "Insurance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
