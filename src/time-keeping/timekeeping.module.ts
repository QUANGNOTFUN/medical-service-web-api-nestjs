import { Module } from '@nestjs/common';
import { TimekeepingResolver } from './timekeeping.resolver';
import { TimekeepingService } from './timekeeping.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [TimekeepingResolver, TimekeepingService, PrismaService],
})
export class TimekeepingModule {}
