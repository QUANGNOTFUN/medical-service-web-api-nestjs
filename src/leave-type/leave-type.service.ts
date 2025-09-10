import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // giả sử bạn đã có PrismaService
import { CreateLeaveTypeInput, UpdateLeaveTypeInput } from './types/leave-type.type';

@Injectable()
export class LeaveTypeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.leaveType.findMany();
  }

  async create(data: CreateLeaveTypeInput) {
    return this.prisma.leaveType.create({ data });
  }

  async update(data: UpdateLeaveTypeInput) {
    return this.prisma.leaveType.update({
      where: { leave_type_id: data.leave_type_id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.leaveType.delete({ where: { leave_type_id: id } });
  }
}
