// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOtpEmail(email: string, employee_id: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Mã xác nhận đặt lại mật khẩu',
      template: './otp',
      context: {
        employee_id,
        otp,
      },
    });
  }
}
