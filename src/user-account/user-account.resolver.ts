// src/user-account/user-account.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserAccountService } from './user-account.service';
import {
  CreateUserAccountInput,
  ResetPasswordInput,
  UpdateUserAccountInput,
  UserAccount,
} from './types/user-account.type';

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

  @Mutation(() => Boolean, { description: 'Gửi mã xác nhận qua email để đặt lại mật khẩu' })
  async forgotPassword(@Args('email') email: string): Promise<boolean> {
    return this.userAccountService.forgotPassword(email);
  }

  @Mutation(() => Boolean, { description: 'Đặt lại mật khẩu bằng mã xác nhận (OTP)' })
  async resetPassword(@Args('input') input: ResetPasswordInput): Promise<boolean> {
    const { email, otp, newPassword } = input;
    return this.userAccountService.resetPassword(email, otp, newPassword);
  }
}
