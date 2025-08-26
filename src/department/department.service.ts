import { Injectable } from '@nestjs/common';
import { CreateDepartmentInput, UpdateDepartmentInput } from './types/department.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDepartmentInput) {
    return this.prisma.department.create({ data });
  }

  async findAll() {
    return this.prisma.department.findMany();
  }

  async findOne(department_id: string) {
    return this.prisma.department.findUnique({ where: { department_id } });
  }

  async update(input: UpdateDepartmentInput) {
    const { department_id, ...rest } = input;
    return this.prisma.department.update({
      where: { department_id },
      data: rest,
    });
  }

  async remove(department_id: string) {
    return this.prisma.department.delete({ where: { department_id } });
  }
}
