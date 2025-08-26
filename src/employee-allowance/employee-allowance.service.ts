import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeAllowanceInput, UpdateEmployeeAllowanceInput } from './types/employee-allowance.type';

@Injectable()
export class EmployeeAllowanceService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEmployeeAllowanceInput) {
    return this.prisma.employee_Allowance.create({ data });
  }

  findAll() {
    return this.prisma.employee_Allowance.findMany({
      include: { employee: true, allowance: true },
    });
  }

  findOne(id: number) {
    return this.prisma.employee_Allowance.findUnique({
      where: { id },
      include: { employee: true, allowance: true },
    });
  }

  update(data: UpdateEmployeeAllowanceInput) {
    const { id, ...updateData } = data;
    return this.prisma.employee_Allowance.update({
      where: { id },
      data: updateData,
    });
  }

  remove(id: number) {
    return this.prisma.employee_Allowance.delete({ where: { id } });
  }
}
