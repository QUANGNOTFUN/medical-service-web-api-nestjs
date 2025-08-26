import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOvertimeTypeInput, UpdateOvertimeTypeInput } from './types/overtime-type.type';


@Injectable()
export class OvertimeTypeService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.overtimeType.findMany({ include: { overtimes: true } });
  }

  findOne(id: number) {
    return this.prisma.overtimeType.findUnique({
      where: { overtime_type_id: id },
      include: { overtimes: true },
    });
  }

  create(data: CreateOvertimeTypeInput) {
    return this.prisma.overtimeType.create({ data });
  }

  update(id: number, data: UpdateOvertimeTypeInput) {
    return this.prisma.overtimeType.update({ where: { overtime_type_id: id }, data });
  }

  delete(id: number) {
    return this.prisma.overtimeType.delete({ where: { overtime_type_id: id } });
  }
}
