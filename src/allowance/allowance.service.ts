import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAllowanceInput, UpdateAllowanceInput } from './types/allowance.type';


@Injectable()
export class AllowanceService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAllowanceInput) {
    return this.prisma.allowance.create({ data });
  }

  findAll() {
    return this.prisma.allowance.findMany();
  }

  findOne(id: number) {
    return this.prisma.allowance.findUnique({ where: { allowance_id: id } });
  }

  update(data: UpdateAllowanceInput) {
    const { allowance_id, ...updateData } = data;
    return this.prisma.allowance.update({
      where: { allowance_id },
      data: updateData,
    });
  }

  remove(id: number) {
    return this.prisma.allowance.delete({ where: { allowance_id: id } });
  }
}
