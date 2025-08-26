import { Module } from '@nestjs/common';
import { UserAccountResolver } from './user-account.resolver';
import { UserAccountService } from './user-account.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { OtpModule } from '../mail/otp.module';

@Module({
  imports: [
    MailModule, // ✅ BẮT BUỘC nếu dùng MailService
    OtpModule,
  ],
  providers: [UserAccountResolver, UserAccountService, PrismaService, JwtService],
  exports: [UserAccountService]
})
export class UserAccountModule {}
