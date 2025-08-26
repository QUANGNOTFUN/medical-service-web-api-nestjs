import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionResolver } from './position.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PositionResolver, PositionService, PrismaService],
  exports: [PositionService],
})
export class PositionModule {}
