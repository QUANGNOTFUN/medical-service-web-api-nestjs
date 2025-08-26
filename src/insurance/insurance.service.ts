import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInsuranceInput, UpdateInsuranceInput } from './types/insurance.type';

@Injectable()
export class InsuranceService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInsuranceInput) {
    return this.prisma.insurance.create({ data });
  }

  async findAll() {
    return this.prisma.insurance.findMany();
  }

  async findOne(id: number) {
    return this.prisma.insurance.findUnique({ where: { insurance_id: id } });
  }

  async update(id: number, data: UpdateInsuranceInput) {
    return this.prisma.insurance.update({
      where: { insurance_id: id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.insurance.delete({ where: { insurance_id: id } });
  }
}
