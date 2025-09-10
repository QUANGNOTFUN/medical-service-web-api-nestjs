import { Module } from '@nestjs/common';
import { LeaveTypeResolver } from './leave-type.resolver';
import { LeaveTypeService } from './leave-type.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [LeaveTypeService, LeaveTypeResolver, PrismaService],
  exports: [LeaveTypeService],
})
export class LeaveTypeModule {}
