import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeService } from './employee.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { OtpModule } from '../mail/otp.module';

@Module({
  imports: [
    MailModule, // ✅ BẮT BUỘC nếu dùng MailService
    OtpModule,
  ],
  providers: [EmployeeResolver, EmployeeService, PrismaService, JwtService],
  exports: [EmployeeService]
})
export class EmployeeModule {}
