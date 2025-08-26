import { Module } from '@nestjs/common';
import { PositionAssignmentService } from './position-assignment.service';
import { PositionAssignmentResolver } from './position-assignment.resolver';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Module for PositionAssignment
 */
@Module({
  providers: [PositionAssignmentResolver, PositionAssignmentService, PrismaService],
  exports: [PositionAssignmentService],
})
export class PositionAssignmentModule {}
