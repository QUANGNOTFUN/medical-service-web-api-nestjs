import { Resolver, Mutation, Args} from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  GetUserByIdInput,
  User,
  PaginationInput,
  UserPaginationResponse,
  UpdateUserInput,
} from './types/user.type';
import { User as PrismaUser } from '@prisma/client';
import { Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { description: 'Lấy thông tin người dùng theo ID' })
  async getUserById(
    @Args('input') input: GetUserByIdInput,
  ): Promise<PrismaUser> {
    return this.userService.findById(input.id);
  }

  @Query(() => User, { description: 'Lấy thông tin người dùng theo email' })
  async getUserByEmail(@Args('email') email: string): Promise<PrismaUser> {
    return this.userService.findByEmail(email);
  }

  @Roles('ADMIN', 'DOCTOR')
  @UseGuards(AuthGuard)
  @Query(() => UserPaginationResponse, { name: 'getAllUsers' })
  async getAllUsers(
    @CurrentUser() user: User,
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
  ): Promise<UserPaginationResponse> {
    console.log('current user=> ', user);
    return this.userService.getAllUsers(pagination);
  }

  @Mutation(() => User, { description: 'Cập nhật thông tin người dùng' })
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<PrismaUser> {
    return this.userService.update(id, input);
  }

  @Mutation(() => User, { description: 'Xóa người dùng' })
  async deleteUser(@Args('id') id: string): Promise<PrismaUser> {
    return this.userService.delete(id);
  }
}