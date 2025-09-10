import { Injectable } from '@nestjs/common';
import { CreateTimekeepingInput, UpdateTimekeepingInput } from './types/timekeeping.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimekeepingService {
  constructor(private prisma: PrismaService) {}

  async findAll(from?: string, to?: string) {
    const where: any = {};

    if (from && to) {
      where.date = {
        gte: new Date(from),
        lte: new Date(to),
      };
    } else if (from) {
      where.date = {
        gte: new Date(from),
      };
    } else if (to) {
      where.date = {
        lte: new Date(to),
      };
    }

    return this.prisma.timekeeping.findMany({
      where,
      include: {
        employee: true,
        workType: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }


  findOne(id: number) {
    return this.prisma.timekeeping.findUnique({
      where: { timekeeping_id: id },
      include: { employee: true, workType: true },
    });
  }

  async create(data: CreateTimekeepingInput) {
    let workHours = 0;
    let leaveHours = 1; // mặc định nghỉ trưa 1 giờ

    if (data.checkin && data.checkout) {
      const ci = new Date(data.checkin);
      const co = new Date(data.checkout);

      const diffMs = co.getTime() - ci.getTime();
      const totalHours = diffMs / (1000 * 60 * 60);

      leaveHours = 1; // nghỉ trưa 1 giờ
      workHours = totalHours - leaveHours;
      if (workHours < 0) workHours = 0;
    }

    return this.prisma.timekeeping.create({
      data: {
        ...data,
        work_hours: workHours,
        leave_hours: leaveHours,
      },
      include: { employee: true, workType: true },
    });
  }

  async update(data: UpdateTimekeepingInput) {
    const { timekeeping_id, ...rest } = data;

    // lấy record cũ từ DB
    const existing = await this.prisma.timekeeping.findUnique({
      where: { timekeeping_id },
    });

    // dùng checkin/checkout từ input hoặc DB
    const ci = rest.checkin ?? existing?.checkin;
    const co = rest.checkout ?? existing?.checkout;

    let workHours = rest.work_hours ?? existing?.work_hours ?? 0;
    let leaveHours = rest.leave_hours ?? existing?.leave_hours ?? 1;

    if (ci && co) {
      const diffMs = new Date(co).getTime() - new Date(ci).getTime();
      const totalHours = diffMs / (1000 * 60 * 60);

      leaveHours = 1; // nghỉ trưa mặc định
      workHours = Math.max(totalHours - leaveHours, 0);
    }

    return this.prisma.timekeeping.update({
      where: { timekeeping_id },
      data: {
        ...rest,
        work_hours: workHours,
        leave_hours: leaveHours,
      },
      include: { employee: true, workType: true },
    });
  }

  remove(id: number) {
    return this.prisma.timekeeping.delete({ where: { timekeeping_id: id } });
  }
}
