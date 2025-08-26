import { Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceResolver } from './insurance.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [InsuranceService, InsuranceResolver, PrismaService],
  exports: [InsuranceService],
})
export class InsuranceModule {}
