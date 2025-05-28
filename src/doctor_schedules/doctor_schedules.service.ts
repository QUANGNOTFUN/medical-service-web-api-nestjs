import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto_Schedules } from './dto/doctor_schedules.dto';
import { DoctorSchedule } from './model/doctor_schedules.model';

@Injectable()
export class DoctorScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(dataSchedule: CreateDoctorDto_Schedules): Promise<DoctorSchedule> {
    return this.prisma.doctorSchedule.create({ data: dataSchedule });
  }

  async findAll(): Promise<DoctorSchedule[]> {
    return this.prisma.doctorSchedule.findMany();
  }

  async delete(id: number): Promise<DoctorSchedule> {
    return this.prisma.doctorSchedule.delete({
      where: { id },
    });
  }

  async update(id: number, data: CreateDoctorDto_Schedules): Promise<DoctorSchedule> {
    return this.prisma.doctorSchedule.update({
      where: { id },
      data,
    });
  }
}