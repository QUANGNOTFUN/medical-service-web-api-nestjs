import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User as PrismaUser } from '@prisma/client';
import {  PaginationInput, UpdateUserInput, UserPaginationResponse } from './types/user.type'; // <- đây là types thực tế trong DB

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<PrismaUser> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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

  async getAllUsers(pagination: PaginationInput): Promise<UserPaginationResponse> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data,
      total,
      currentPage: page,
      itemsPerPage: limit,
    };
  }
  async update(id: string, input: UpdateUserInput): Promise<PrismaUser> {
    await this.findById(id); // kiểm tra tồn tại
    return this.prisma.user.update({
      where: { id },
      data: { ...input },
    });
  }

  async delete(id: string): Promise<PrismaUser> {
    await this.findById(id); // kiểm tra tồn tại
    return this.prisma.user.delete({ where: { id } });
  }
}