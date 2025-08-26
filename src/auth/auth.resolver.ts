import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LoginResponse } from './models/auth.model';
import { UserAccount } from '../user-account/types/user-account.type';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => UserAccount)
    async register(@Args("userData") userData: RegisterDto): Promise<UserAccount> {
      return await this.authService.register(userData);
    }

    @Mutation(() => LoginResponse)
    async login(@Args("userData") userData: LoginDto): Promise<LoginResponse> {
        return await this.authService.login(userData);
    }
    @Query(() => String)
    hello(): string {
      return "Hello GraphQL!";
    }
}
