import { Resolver, Mutation, Args} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, GetUserByIdInput, User } from './model/user.model';
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
}