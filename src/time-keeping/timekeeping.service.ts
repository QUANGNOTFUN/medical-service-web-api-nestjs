import { Injectable } from '@nestjs/common';
import { CreateTimekeepingInput, UpdateTimekeepingInput } from './types/timekeeping.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimekeepingService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.timekeeping.findMany({
      include: { employee: true, workType: true },
    });
  }

  findOne(id: number) {
    return this.prisma.timekeeping.findUnique({
      where: { timekeeping_id: id },
      include: { employee: true, workType: true },
    });
  }

  create(data: CreateTimekeepingInput) {
    return this.prisma.timekeeping.create({
      data,
      include: { employee: true, workType: true },
    });
  }

  update(data: UpdateTimekeepingInput) {
    const { timekeeping_id, ...rest } = data;
    return this.prisma.timekeeping.update({
      where: { timekeeping_id },
      data: rest,
      include: { employee: true, workType: true },
    });
  }

  remove(id: number) {
    return this.prisma.timekeeping.delete({ where: { timekeeping_id: id } });
  }
}
