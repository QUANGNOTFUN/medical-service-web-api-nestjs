import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Appointment as PrismaAppointment } from '@prisma/client';
import { CreateAppointmentInput } from './types/appointments.type';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateAppointmentInput): Promise<PrismaAppointment> {
    return this.prisma.appointment.create({
      data: { ...input },
    });
  }

  async findAll(): Promise<PrismaAppointment[]> {
    return this.prisma.appointment.findMany({
      orderBy: { appointment_date: 'asc' },
    });
  }

  async findOne(id: number): Promise<PrismaAppointment> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { appointment_id: id },
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment #${id} not found`);
    }
    return appointment;
  }

  async remove(id: number): Promise<PrismaAppointment> {
    await this.findOne(id);
    return this.prisma.appointment.delete({
      where: { appointment_id: id },
    });
  }
}
