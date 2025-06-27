import { Injectable, BadRequestException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto_Schedules } from './dto/doctor_schedules.dto';
import { DoctorSchedule } from './model/doctor_schedules.model';

@Injectable()
export class DoctorScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(dataSchedule: CreateDoctorDto_Schedules): Promise<DoctorSchedule> {
    const now = new Date();

    // Không cho tạo lịch trong quá khứ
    if (dataSchedule.start_time < now || dataSchedule.end_time < now) {
      throw new BadRequestException('Không thể tạo lịch cho ngày hoặc giờ trong quá khứ');
    }

    // Giới hạn kiểm tra trùng trong cùng 1 ngày
    const startOfDay = new Date(dataSchedule.start_time);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(dataSchedule.start_time);
    endOfDay.setHours(23, 59, 59, 999);

    //Kiểm tra trùng giờ trong cùng ngày
    const conflict = await this.prisma.doctorSchedule.findFirst({
      where: {
        doctor_id: dataSchedule.doctor_id,
        AND: [
          {
            start_time: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
          {
            start_time: { lt: dataSchedule.end_time },
            end_time: { gt: dataSchedule.start_time },
          },
        ],
      },
    });

    if (conflict) {
      throw new BadRequestException('Khung giờ này bị trùng với lịch hiện có trong ngày');
    }

    // Nếu hợp lệ thì tạo
    return this.prisma.doctorSchedule.create({
      data: {
        ...dataSchedule,
        is_available: dataSchedule.is_available ?? true,
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

  // Chia nhỏ khung giờ thành các slot (ví dụ: 30 phút)
  async generateTimeSlots(
    doctor_id: string,
    startTime: Date,
    endTime: Date,
    slotDuration: number = 30, // Độ dài slot (phút)
  ): Promise<DoctorSchedule[]> {
    const slots: CreateDoctorDto_Schedules[] = [];
    let currentTime = new Date(startTime);

    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + slotDuration * 60 * 1000);
      if (slotEnd <= endTime) {
        slots.push({
          doctor_id,
          start_time: new Date(currentTime),
          end_time: slotEnd,
          is_available: true,
        });
      }
      currentTime = slotEnd;
    }

    // Kiểm tra trùng lặp cho tất cả slots
    for (const slot of slots) {
      const conflict = await this.prisma.doctorSchedule.findFirst({
        where: {
          doctor_id: slot.doctor_id,
          OR: [
            {
              start_time: { lte: slot.end_time },
              end_time: { gte: slot.start_time },
            },
          ],
        },
      });

      if (conflict) {
        throw new BadRequestException(`Khung giờ từ ${slot.start_time} đến ${slot.end_time} bị trùng`);
      }
    }

    // Lưu tất cả slots
    return this.prisma.doctorSchedule.createMany({
      data: slots,
    }).then(() => slots.map(slot => ({ ...slot, id: 0, created_at: new Date() }))); // Trả về slots đã tạo
  }

  // Lấy tất cả lịch
  async findAll(): Promise<DoctorSchedule[]> {
    return this.prisma.doctorSchedule.findMany();
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


  async findAvailableSchedules(doctor_id: string, date: string): Promise<DoctorSchedule[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.doctorSchedule.findMany({
      where: {
        doctor_id,
        is_available: true,
        start_time: { gte: startOfDay, lte: endOfDay },
      },
    });
  }

  // Xóa lịch
  async delete(id: number): Promise<DoctorSchedule> {
    return this.prisma.doctorSchedule.delete({
      where: { id },
    });
  }

  // Cập nhật lịch
  async update(id: number, data: CreateDoctorDto_Schedules): Promise<DoctorSchedule> {
    // Kiểm tra trùng lặp (loại trừ lịch hiện tại)
    const conflict = await this.prisma.doctorSchedule.findFirst({
      where: {
        doctor_id: data.doctor_id,
        id: { not: id },
        OR: [
          {
            start_time: { lte: data.end_time },
            end_time: { gte: data.start_time },
          },
        ],
      },
    });

    if (conflict) {
      throw new BadRequestException('Khung giờ này trùng với lịch hiện có');
    }

    return this.prisma.doctorSchedule.update({
      where: { id },
      data,
    });
  }

  // Tự động tạo lịch cho tất cả bác sĩ hàng ngày
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateDailySchedules() {
    // Lấy danh sách bác sĩ
    const doctors = await this.prisma.doctors.findMany();

    for (const doctor of doctors) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Tạo các slot 30 phút từ 8:00–12:00 và 13:00–17:00
      await this.generateTimeSlots(
        doctor.id,
        new Date(tomorrow.setHours(8, 0, 0, 0)),
        new Date(tomorrow.setHours(12, 0, 0, 0)),
        30,
      );
      await this.generateTimeSlots(
        doctor.id,
        new Date(tomorrow.setHours(13, 0, 0, 0)),
        new Date(tomorrow.setHours(17, 0, 0, 0)),
        30,
      );
    }
    console.log('Đã tạo lịch làm việc cho bác sĩ');
  }
}