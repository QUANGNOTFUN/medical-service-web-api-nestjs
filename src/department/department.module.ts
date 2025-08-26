import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [DepartmentResolver, DepartmentService, PrismaService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
