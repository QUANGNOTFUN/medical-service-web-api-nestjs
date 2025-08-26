// src/user-account/user-account.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserAccountService } from './user-account.service';
import { CreateUserAccountInput, UpdateUserAccountInput, UserAccount } from './types/user-account.type';

@Resolver(() => UserAccount)
export class UserAccountResolver {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Query(() => [UserAccount])
  async getUserAccounts() {
    return this.userAccountService.getAll();
  }

  @Query(() => UserAccount)
  async getUserAccountByEmail(@Args('email') email: string) {
    return this.userAccountService.getByEmail(email);
  }

  @Mutation(() => UserAccount)
  async createUserAccount(@Args('data') data: CreateUserAccountInput) {
    return this.userAccountService.create(data);
  }

  @Mutation(() => UserAccount)
  async updateUserAccount(
    @Args('email') email: string,
    @Args('data') data: UpdateUserAccountInput,
  ) {
    return this.userAccountService.update(email, data);
  }

  @Mutation(() => Boolean)
  async deleteUserAccount(@Args('email') email: string) {
    await this.userAccountService.delete(email);
    return true;
  }
}
