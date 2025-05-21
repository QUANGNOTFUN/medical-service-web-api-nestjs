import { Resolver, Mutation, Args} from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  CreateUserInput,
  GetUserByIdInput,
  User,
  PaginationInput,
  UserPaginationResponse,
  UpdateUserInput,
} from './model/user.model';
import { User as PrismaUser } from '@prisma/client';
import { Query } from '@nestjs/graphql'; // ✅ đúng

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { description: 'Tạo người dùng mới' })
  async createUser(@Args('input') input: CreateUserInput): Promise<PrismaUser> {
    return this.userService.create(input);
  }

  @Query(() => User, { description: 'Lấy thông tin người dùng theo ID' })
  async getUserById(@Args('input') input: GetUserByIdInput): Promise<PrismaUser> {
    return this.userService.findById(input.id);
  }

  @Query(() => UserPaginationResponse, { name: 'getAllUsers' })
  async getAllUsers(@Args('pagination', { type: () => PaginationInput, nullable: true }) pagination: PaginationInput,): Promise<UserPaginationResponse> {
    return this.userService.getAllUsers(pagination);
  }

  @Mutation(() => User, { description: 'Cập nhật thông tin người dùng' })
  async updateUser(@Args('id') id: string, @Args('input') input: UpdateUserInput): Promise<PrismaUser> {
    return this.userService.update(id, input);
  }

  @Mutation(() => User, { description: 'Xóa người dùng' })
  async deleteUser(@Args('id') id: string): Promise<PrismaUser> {
    return this.userService.delete(id);
  }

}