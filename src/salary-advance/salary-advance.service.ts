import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaryAdvanceInput, UpdateSalaryAdvanceInput } from './types/salary-advance.type';

@Injectable()
export class SalaryAdvanceService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSalaryAdvanceInput) {
    return this.prisma.salaryAdvance.create({ data });
  }

  findAll() {
    return this.prisma.salaryAdvance.findMany({ include: { employee: true } });
  }

  findOne(id: number) {
    return this.prisma.salaryAdvance.findUnique({ where: { id }, include: { employee: true } });
  }

  update(input: UpdateSalaryAdvanceInput) {
    const { id, ...rest } = input;
    return this.prisma.salaryAdvance.update({
      where: { id },
      data: rest,
    });
  }

  remove(id: number) {
    return this.prisma.salaryAdvance.delete({ where: { id } });
  }
}
