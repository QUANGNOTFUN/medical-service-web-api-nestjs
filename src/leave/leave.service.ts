import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaveInput, UpdateLeaveInput } from './types/leave.type';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.leave.findMany({ include: {
      leaveType: true,
      employee: true,
      } });
  }

  async findByEmployee(employee_id: string) {
    return this.prisma.leave.findMany({
      where: { employee_id },
      include: { leaveType: true },
    });
  }

  async create(data: CreateLeaveInput) {
    return this.prisma.leave.create({ data,      include: { employee: true },
  });
  }

  async update(params: { leave_id: number; data: UpdateLeaveInput }) {
    const { leave_id, data } = params;
    return this.prisma.leave.update({
      where: { leave_id },
      data: {
        leave_type_id: data.leave_type_id,
        start_date: data.start_date,
        end_date: data.end_date,
        reason: data.reason,
        status: data.status,
      },
      include: {
        leaveType: true,
        employee: true,
      },
    });
  }

  async approve(id: number) {
    return this.prisma.leave.update({
      where: { leave_id: id },
      data: { status: 'APPROVED' },
    });
  }

  async reject(id: number) {
    return this.prisma.leave.update({
      where: { leave_id: id },
      data: { status: 'REJECTED' },
    });
  }

  async delete(id: number) {
    return this.prisma.leave.delete({ where: { leave_id: id } });
  }
}
