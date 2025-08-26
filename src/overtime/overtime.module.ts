import { Module } from '@nestjs/common';
import { OvertimeResolver } from './overtime.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { OvertimeService } from './overtime.service';

@Module({
  providers: [OvertimeService, OvertimeResolver, PrismaService],
})
export class OvertimeModule {}
