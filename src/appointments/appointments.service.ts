import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Appointment as PrismaAppointment } from '@prisma/client';
import { CreateAppointmentInput, PaginatedAppointment, UpdateAppointmentInput } from './types/appointments.type';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateAppointmentInput): Promise<PrismaAppointment> {
    return this.prisma.appointment.create({
      data: { ...input },
    });
  }

  async findAllByDoctorId(
    doctorId: string,
    page: number,
    pageSize: number
  ): Promise<PaginatedAppointment> {
    const skip = (page - 1) * pageSize;

    const [appointments, total] = await this.prisma.$transaction([
      this.prisma.appointment.findMany({
        where: { doctor_id: doctorId },
        skip,
        take: pageSize,
        orderBy: { created_at: 'desc' },
        include:{
          patient:{
            include:{
              user: true,
            }
          }
        }
      }),
      this.prisma.appointment.count({
        where: { doctor_id: doctorId },
      }),
    ]);

    return {
      items: appointments,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
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

  async update(input: UpdateAppointmentInput): Promise<PrismaAppointment> {
    return this.prisma.appointment.update({
      where: { appointment_id: input.appointment_id },
      data: {
        status: input.status,
        is_done:input.is_done,
      },
    });
  }


  async remove(id: number): Promise<PrismaAppointment> {
    await this.findOne(id);
    return this.prisma.appointment.delete({
      where: { appointment_id: id },
    });
  }
}
