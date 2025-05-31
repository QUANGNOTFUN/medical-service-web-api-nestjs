import { Module } from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { AppointmentResolver } from './appointments.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [AppointmentResolver, AppointmentService, PrismaService],
})
export class AppointmentsModule {}
