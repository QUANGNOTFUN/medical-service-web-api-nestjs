// src/user-account/user-account.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserAccountInput, UpdateUserAccountInput } from './types/user-account.type';
import { UserAccount as PrismaUserAccount } from '@prisma/client';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../mail/otp.service';

@Injectable()
export class UserAccountService {
  constructor(private prisma: PrismaService,
              private readonly mailService: MailService,
              private readonly otpService: OtpService,

  ) {}

  async getAll() {
    return this.prisma.userAccount.findMany();
  }
  async getByEmail(email: string): Promise<PrismaUserAccount> {
    const user = await this.prisma.userAccount.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // async findById(id: string): Promise<PrismaUserAccount> {
  //   const user = await this.prisma.userAccount.findUnique({
  //     where: { id },
  //
  //   });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user;
  // }

  async create(data: CreateUserAccountInput) {
    const existing = await this.prisma.userAccount.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.userAccount.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async update(email: string, input: UpdateUserAccountInput): Promise<PrismaUserAccount> {
    await this.getByEmail(email); // kiểm tra tồn tại
    return this.prisma.userAccount.update({
      where: { email },
      data: { ...input },
    });
  }

  async delete(email: string) {
    await this.getByEmail(email);
    return this.prisma.userAccount.delete({
      where: { email },
    });
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.prisma.userAccount.findFirst({ where: { email } });
    if (!user) return true; // Tránh lộ email tồn tại

    const otp = this.otpService.generate(); // ví dụ: random 6 số
    this.otpService.saveOtp(email, otp); // lưu DB hoặc cache

    await this.mailService.sendOtpEmail(user.email, user.employee_id, otp); // gửi email

    return true;
  }

  async resetPassword(email: string, otp: string, newPassword: string): Promise<boolean> {
    const isValid = this.otpService.verifyOtp(email, otp);

    if (!isValid) {
      throw new BadRequestException('Mã xác nhận không đúng hoặc đã hết hạn');
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await this.prisma.userAccount.update({
      where: { email },
      data: { password: hashed },
    });

    this.otpService.deleteOtp(email); // xoá sau khi dùng

    return true;
  }
}
