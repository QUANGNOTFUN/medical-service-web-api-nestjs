import { Module } from '@nestjs/common';
import { BonusDisciplineService } from './bonus-discipline.service';
import { BonusDisciplineResolver } from './bonus-discipline.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [BonusDisciplineService, BonusDisciplineResolver, PrismaService],
  exports: [BonusDisciplineService],
})
export class BonusDisciplineModule {}
