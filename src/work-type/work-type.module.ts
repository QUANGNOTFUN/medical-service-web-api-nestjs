import { Module } from '@nestjs/common';
import { WorkTypeResolver } from './work-type.resolver';
import { WorkTypeService } from './work-type.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [WorkTypeResolver, WorkTypeService, PrismaService],
})
export class WorkTypeModule {}
