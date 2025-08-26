import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOvertimeInput, UpdateOvertimeInput } from './types/overtime.type';

@Injectable()
export class OvertimeService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.overtime.findMany({
      include: { employee: true, overtimeType: true },
    });
  }

  findOne(id: number) {
    return this.prisma.overtime.findUnique({
      where: { id },
      include: { employee: true, overtimeType: true },
    });
  }

  create(data: CreateOvertimeInput) {
    return this.prisma.overtime.create({ data });
  }

  update(id: number, data: UpdateOvertimeInput) {
    return this.prisma.overtime.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.overtime.delete({ where: { id } });
  }
}
