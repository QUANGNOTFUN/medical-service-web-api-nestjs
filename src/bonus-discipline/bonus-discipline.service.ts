import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBonusDisciplineInput, UpdateBonusDisciplineInput } from './types/bonus-discipline.type';


@Injectable()
export class BonusDisciplineService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBonusDisciplineInput) {
    return this.prisma.bonusDiscipline.create({ data });
  }

  async findAll() {
    return this.prisma.bonusDiscipline.findMany();
  }

  async findOne(id: number) {
    return this.prisma.bonusDiscipline.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateBonusDisciplineInput) {
    return this.prisma.bonusDiscipline.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.bonusDiscipline.delete({ where: { id } });
  }
}
