import { Module } from '@nestjs/common';
import { AllowanceService } from './allowance.service';
import { AllowanceResolver } from './allowance.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [AllowanceService, AllowanceResolver, PrismaService],
})
export class AllowanceModule {}
