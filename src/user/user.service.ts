import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, User as PrismaUser } from '@prisma/client';
import { CreateUserInput } from './model/user.model'; // <- đây là model thực tế trong DB
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateUserInput): Promise<User> {
    const { password, ...rest } = input;
    const password_hash: string = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        ...rest,
        password_hash,
      },
    });
  }

  async findById(id: string): Promise<PrismaUser> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}