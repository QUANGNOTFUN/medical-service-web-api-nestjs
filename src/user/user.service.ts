import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput, UpdateUserInput, User, UserPaginationResponse } from './model/user.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateUserInput): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          id: crypto.randomUUID(),
          full_name: input.full_name,
          phone: input.phone,
          address: input.address,
          gender: input.gender,
          date_of_birth: input.date_of_birth,
          created_at: new Date(),
          updated_at: new Date()
        },
      });
      return {
        id: user.id,
        full_name: user.full_name,
        phone: user.phone ?? undefined,
        address: user.address ?? undefined,
        gender: user.gender,
        date_of_birth: user.date_of_birth ?? undefined,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Người dùng đã tồn tại với ID hoặc thông tin trùng lặp.');
      }
      this.logger.error('Lỗi khi tạo người dùng:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID: ${id}`);
    }

    return {
      id: user.id,
      full_name: user.full_name,
      phone: user.phone ?? undefined,
      address: user.address ?? undefined,
      gender: user.gender,
      date_of_birth: user.date_of_birth ?? undefined,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async findAll(page: number, itemsPerPage: number): Promise<UserPaginationResponse> {
    try {
      const skip = (page - 1) * itemsPerPage;
      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          skip,
          take: itemsPerPage,
        }),
        this.prisma.user.count(),
      ]);

      const formattedUsers = users.map(user => ({
        id: user.id,
        full_name: user.full_name,
        phone: user.phone ?? undefined,
        address: user.address ?? undefined,
        gender: user.gender,
        date_of_birth: user.date_of_birth ?? undefined,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }));

      return {
        data: formattedUsers,
        total,
        currentPage: page,
        itemsPerPage,
      };
    } catch (error: any) {
      this.logger.error('Lỗi khi lấy danh sách người dùng:', error);
      throw error;
    }
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    try {
      const existingUser = await this.findById(id); // Kiểm tra user có tồn tại

      const updatedUser = await this.prisma.user.update({
        where: { id: id },
        data: {
          full_name: input.full_name ?? existingUser.full_name,
          phone: input.phone ?? existingUser.phone,
          address: input.address ?? existingUser.address,
          gender: input.gender ?? existingUser.gender,
          date_of_birth: input.date_of_birth ?? existingUser.date_of_birth,
          updated_at: new Date(),
        },
      });

      return {
        id: updatedUser.id,
        full_name: updatedUser.full_name,
        phone: updatedUser.phone ?? undefined,
        address: updatedUser.address ?? undefined,
        gender: updatedUser.gender,
        date_of_birth: updatedUser.date_of_birth ?? undefined,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at,
      };
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error('Lỗi khi cập nhật người dùng:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<User> {
    try {await this.findById(id);
// Kiểm tra user có tồn tại

      const deletedUser = await this.prisma.user.delete({
        where: { id: id },
      });

      return {
        id: deletedUser.id,
        full_name: deletedUser.full_name,
        phone: deletedUser.phone ?? undefined,
        address: deletedUser.address ?? undefined,
        gender: deletedUser.gender,
        date_of_birth: deletedUser.date_of_birth ?? undefined,
        created_at: deletedUser.created_at,
        updated_at: deletedUser.updated_at,
      };
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error('Lỗi khi xóa người dùng:', error);
      throw error;
    }
  }
}