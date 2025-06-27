import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateDoctorScheduleInput,
  ShiftType,
} from './types/doctor_schedules.dto';
import {
  DoctorSchedule,
  DoctorScheduleResponse,
} from './types/doctor_schedules.model';
import { WeekDateInput } from './types/week_date_input.type';

@Injectable()
export class DoctorScheduleService {
  constructor(private prisma: PrismaService) {}

  async getDoctorScheduleByWeekDate(
    weekDate: WeekDateInput,
  ): Promise<DoctorScheduleResponse[]> {
    const startDate = new Date(weekDate.start_week);
    const endDate = new Date(weekDate.end_week);

    return this.prisma.doctorSchedule.findMany({
      where: {
        start_time: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        doctor: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async create(input: CreateDoctorScheduleInput): Promise<DoctorSchedule> {
    try {
      const doctor = await this.prisma.doctors.findUnique({
        where: { id: input.doctor_id },
      });
      if (!doctor) {
        new Error('Doctor not found');
      }

      const baseDate = new Date(input.date);
      let latestSchedule = new DoctorSchedule();

      for (let i = 0; i < input.week_count; i++) {
        const startTime = new Date(baseDate);
        const endTime = new Date(baseDate);
        startTime.setDate(baseDate.getDate() + i * 7);
        endTime.setDate(baseDate.getDate() + i * 7);

        switch (input.shift) {
          case ShiftType.MORNING:
            startTime.setHours(8, 0, 0, 0);
            endTime.setHours(12, 0, 0, 0);
            break;
          case ShiftType.AFTERNOON:
            startTime.setHours(13, 0, 0, 0);
            endTime.setHours(17, 0, 0, 0);
            break;
          case ShiftType.OVERTIME:
            startTime.setHours(18, 0, 0, 0);
            endTime.setHours(22, 0, 0, 0);
            break;
          default:
            new Error('Invalid shift type');
        }

        // Tạo bản ghi và lưu kết quả
        latestSchedule = await this.prisma.doctorSchedule.create({
          data: {
            doctor_id: input.doctor_id,
            day: input.day,
            shift: input.shift,
            start_time: startTime,
            end_time: endTime,
            is_available: input.is_available ?? true,
          },
        });
      }

      if (!latestSchedule) {
        new Error('No schedule created');
      }

      return latestSchedule;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  }

  async findSchedulesByDoctorAndDate(doctor_id: string, date: string) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 1);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.doctorSchedule.findMany({
      where: {
        doctor_id,
        OR: [
          {
            start_time: { lte: endOfDay },
            end_time: { gte: startOfDay },
          },
        ],
      },
    });
  }

  async getAvailableScheduleDates(doctor_id: string): Promise<string[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set về đầu ngày

    const schedules = await this.prisma.doctorSchedule.findMany({
      where: {
        doctor_id,
        is_available: true,
        start_time: {
          gte: today,
        },
      },
      select: {
        start_time: true,
      },
    });

    const uniqueDates = Array.from(
      new Set(
        schedules.map((s) => s.start_time.toISOString().split('T')[0]) // lấy phần yyyy-mm-dd
      )
    );

    return uniqueDates.sort(); // sắp xếp tăng dần
  }

  // Xóa lịch
  async delete(id: number): Promise<DoctorSchedule> {
    return this.prisma.doctorSchedule.delete({
      where: { id },
    });
  }

  async update(
    id: number,
    data: CreateDoctorScheduleInput,
  ): Promise<DoctorSchedule> {
    return this.prisma.doctorSchedule.update({
      where: { id },
      data,
    });
  }
}