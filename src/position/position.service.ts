import { Injectable } from '@nestjs/common';
import { CreatePositionInput, UpdatePositionInput } from './types/position.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PositionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePositionInput) {
    return this.prisma.position.create({ data });
  }

  async findAll() {
    return this.prisma.position.findMany();
  }

  async findOne(position_id: string) {
    return this.prisma.position.findUnique({ where: { position_id } });
  }

  async update(input: UpdatePositionInput) {
    const { position_id, ...rest } = input;
    return this.prisma.position.update({
      where: { position_id },
      data: rest,
    });
  }

  async remove(position_id: string) {
    return this.prisma.position.delete({ where: { position_id } });
  }
}
