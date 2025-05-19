import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, GetUserByIdInput, UpdateUserInput, User, UserPaginationResponse } from './model/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { description: 'Tạo người dùng mới' })
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  @Query(() => User, { description: 'Lấy thông tin người dùng theo ID' })
  async getUserById(@Args('input') input: GetUserByIdInput): Promise<User> {
    return this.userService.findById(input.id);
  }

  @Query(() => UserPaginationResponse, { description: 'Lấy danh sách người dùng với phân trang' })
  async getUsers(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('itemsPerPage', { type: () => Int, defaultValue: 10 }) itemsPerPage: number,
  ): Promise<UserPaginationResponse> {
    return this.userService.findAll(page, itemsPerPage);
  }

  @Mutation(() => User, { description: 'Cập nhật thông tin người dùng' })
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(id, input);
  }

  @Mutation(() => User, { description: 'Xóa người dùng' })
  async deleteUser(@Args('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }
}