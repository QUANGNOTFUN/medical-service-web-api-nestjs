import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePositionAssignmentInput, UpdatePositionAssignmentInput } from './types/position-assignment.type';


@Injectable()
export class PositionAssignmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePositionAssignmentInput) {
    return this.prisma.positionAssignment.create({ data });
  }

  async findAll() {
    return this.prisma.positionAssignment.findMany({
      include: {
        employee: true,
        department: true,
        position: true,
      },
    });
  }

  async findOne(employee_id: string, department_id: string, position_id: string) {
    return this.prisma.positionAssignment.findUnique({
      where: {
        employee_id_department_id_position_id: {
          employee_id,
          department_id,
          position_id,
        },
      },
      include: {
        employee: true,
        department: true,
        position: true,
      },
    });
  }

  async update(data: UpdatePositionAssignmentInput) {
    const { employee_id, department_id, position_id, ...rest } = data;
    return this.prisma.positionAssignment.update({
      where: {
        employee_id_department_id_position_id: {
          employee_id,
          department_id,
          position_id,
        },
      },
      data: rest,
    });
  }

  async remove(employee_id: string, department_id: string, position_id: string) {
    return this.prisma.positionAssignment.delete({
      where: {
        employee_id_department_id_position_id: {
          employee_id,
          department_id,
          position_id,
        },
      },
    });
  }
}
