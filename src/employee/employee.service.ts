import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeInput, UpdateEmployeeInput } from './types/employee.type';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.employee.findMany({
        include:{
          positionAssignments:{
            include: {
              department: true,
              position: true,
            },
          },
        },
      }
    );
  }

  async getById(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { employee_id: id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return employee;
  }

  async create(data: CreateEmployeeInput) {
    return this.prisma.employee.create({
      data: {
        ...data,
        employee_id: `NV${Date.now()}`, // Tạo ID tự động, có thể thay bằng UUID
      },
    });
  }

  async update(id: string, data: UpdateEmployeeInput) {
    const { department_id, position_id, ...rest } = data;

    return this.prisma.employee.update({
      where: { employee_id: id },
      data: {
        ...rest,
        positionAssignments: department_id && position_id
          ? {
            upsert: {
              create: {
                department_id,
                position_id,
              },
              update: {
                department_id,
                position_id,
              },
              where: {
                employee_id_department_id_position_id: {
                  employee_id: id,
                  department_id,
                  position_id,
                },
              },
            },
          }
          : undefined,
      },
      include: {
        positionAssignments: {
          include: {
            department: true,
            position: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);
    return this.prisma.employee.delete({
      where: { employee_id: id },
    });
  }
}
