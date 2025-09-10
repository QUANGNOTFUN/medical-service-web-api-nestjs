import { Injectable } from '@nestjs/common';
import { CreateDepartmentInput, UpdateDepartmentInput } from './types/department.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDepartmentInput) {
    // Lấy department có ID lớn nhất
    const lastDept = await this.prisma.department.findFirst({
      orderBy: { department_id: "desc" },
    });

    // Sinh ID mới
    let newId = "D001";
    if (lastDept) {
      const lastNumber = parseInt(lastDept.department_id.replace("D", ""), 10);
      newId = `D${String(lastNumber + 1).padStart(3, "0")}`;
    }

    return this.prisma.department.create({
      data: {
        ...data,
        department_id: newId,
      },
    });
  }

  findAll() {
    return this.prisma.department.findMany({
      include: { positionAssignments: {
          include: { employee: true, position: true },
        }
        }, // ✅ lấy cả nhân sự
    });
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
