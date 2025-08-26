import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContractInput, UpdateContractInput } from './types/contract.type';

@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateContractInput) {
    return this.prisma.contract.create({ data });
  }

  findAll() {
    return this.prisma.contract.findMany({ include: { employee: true } });
  }

  findOne(contract_id: number) {
    return this.prisma.contract.findUnique({ where: { contract_id }, include: { employee: true } });
  }

  update(input: UpdateContractInput) {
    const { contract_id, ...rest } = input;
    return this.prisma.contract.update({
      where: { contract_id },
      data: rest,
    });
  }

  remove(contract_id: number) {
    return this.prisma.contract.delete({ where: { contract_id } });
  }
}
