import { Module } from '@nestjs/common';
import { SalaryAdvanceService } from './salary-advance.service';
import { SalaryAdvanceResolver } from './salary-advance.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [SalaryAdvanceResolver, SalaryAdvanceService, PrismaService],
  exports: [SalaryAdvanceService],
})
export class SalaryAdvanceModule {}
