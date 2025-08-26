import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractResolver } from './contract.resolver';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  providers: [ContractResolver, ContractService, PrismaService],
  exports: [ContractService],
})
export class ContractModule {}
