import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client'; // Giả sử bạn dùng Prisma
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
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
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      if (!payload.sub) {
        throw new UnauthorizedException('Token không hợp lệ: thiếu id');
      }

      req.user_data = await this.userService.findById(payload.sub);

      return true;
    } catch (error) {
      this.logger.error(`Lỗi xác thực token: ${error instanceof Error ? error.message : 'Unknown error'}`);
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