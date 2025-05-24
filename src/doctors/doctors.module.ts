import { Module } from '@nestjs/common';
import { DoctorsResolver } from './doctors.resolver';
import { DoctorsService } from './doctors.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [DoctorsResolver, DoctorsService, PrismaService]
})
export class DoctorsModule {}
