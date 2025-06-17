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
      }),
      this.prisma.appointment.count({
        where: { doctor_id: doctorId },
      }),
    ]);

    return {
      items: appointments.map((item) => ({
        appointment_id: item.appointment_id,
        patient_id: item.patient_id,
        doctor_id: item.doctor_id,
        schedule_id: item.schedule_id,
        appointment_type: item.appointment_type,
        appointment_date: item.appointment_date,
        status: item.status,
        is_anonymous: item.is_anonymous,
        notes: item.notes ?? '',
        created_at: item.created_at,
        updated_at: item.updated_at ?? undefined,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
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
