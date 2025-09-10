import { Injectable } from '@nestjs/common';
import { CreatePositionInput, UpdatePositionInput } from './types/position.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PositionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePositionInput) {
    const lastPosi = await this.prisma.position.findFirst({
      orderBy: { position_id: "desc" },
    });

    // Sinh ID mới
    let newId = "P001";
    if (lastPosi) {
      const lastNumber = parseInt(lastPosi.position_id.replace("P", ""), 10);
      newId = `P${String(lastNumber + 1).padStart(3, "0")}`;
    }

    return this.prisma.position.create({
      data: {
        ...data,
        position_id: newId,
      },
    });
  }

  async findAll() {
    return this.prisma.position.findMany({
      include: { positionAssignments: {
          include: { employee: true, department: true },
        }
      },
    });
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
