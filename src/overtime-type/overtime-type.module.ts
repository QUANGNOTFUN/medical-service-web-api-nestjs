import { Module } from '@nestjs/common';
import { OvertimeTypeService } from './overtime-type.service';
import { OvertimeTypeResolver } from './overtime-type.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [OvertimeTypeService, OvertimeTypeResolver, PrismaService],
})
export class OvertimeTypeModule {}
