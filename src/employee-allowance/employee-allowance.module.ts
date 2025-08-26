import { Module } from '@nestjs/common';
import { EmployeeAllowanceService } from './employee-allowance.service';
import { EmployeeAllowanceResolver } from './employee-allowance.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [EmployeeAllowanceService, EmployeeAllowanceResolver, PrismaService],
})
export class EmployeeAllowanceModule {}
