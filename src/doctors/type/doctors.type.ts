import { Doctors, User, DoctorSchedule } from '@prisma/client';

export type DoctorWithRelations = Doctors & {
  user: User;
  schedule: DoctorSchedule | null;
};

