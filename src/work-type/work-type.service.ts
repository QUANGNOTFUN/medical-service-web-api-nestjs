import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkTypeInput, UpdateWorkTypeInput } from './types/work-type.type';

@Injectable()
export class WorkTypeService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.workType.findMany();
  }

  findOne(id: number) {
    return this.prisma.workType.findUnique({ where: { work_type_id: id } });
  }

  create(data: CreateWorkTypeInput) {
    return this.prisma.workType.create({ data });
  }

  update(data: UpdateWorkTypeInput) {
    const { work_type_id, ...rest } = data;
    return this.prisma.workType.update({
      where: { work_type_id },
      data: rest,
    });
  }

  remove(id: number) {
    return this.prisma.workType.delete({ where: { work_type_id: id } });
  }
}
