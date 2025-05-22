import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client'; // Giả sử bạn dùng Prisma

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<{
      req: { headers: Record<string, string | undefined>; user_data?: User };
    }>().req;
    const token = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException('Không tìm thấy token');
    }

    try {
      // Xác minh token với kiểu payload rõ ràng
      const payload = await this.jwtService.verifyAsync<{ id: string }>(token, {
        secret: process.env.ACCESS_TOKEN_KEY ?? 'default-secret', // Cung cấp giá trị mặc định
      });

      // Kiểm tra payload.id
      if (!payload.id) {
        throw new UnauthorizedException('Token không hợp lệ: thiếu id');
      }

      // Giả sử findById là hàm đúng (thay vì findOne)
      req.user_data = await this.userService.findById(payload.id);

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Token không hợp lệ hoặc đã hết hạn',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private extractToken(req: {
    headers: Record<string, string | undefined>;
  }): string | undefined {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ') as [
      string | undefined,
      string | undefined,
    ];
    return type === 'Bearer' && token ? token : undefined;
  }
}