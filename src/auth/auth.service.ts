import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { compare, hash } from 'bcrypt';
import { LoginResponse } from './models/auth.model';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(userData: RegisterDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email: userData.email, },
    });
    if (user) {
      throw new HttpException(
        { message: 'This email has been used!' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPass = await hash(userData.password, 10);
    return this.prismaService.user.create({
      data: { ...userData, password: hashPass },
    });
  }

  async login(userData: LoginDto): Promise<LoginResponse> {
    //step1: check email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      throw new HttpException(
        { message: 'Account not found!' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    //step2: check password

    const verify = await compare(userData.password, user.password);

    if (!verify) {
      throw new HttpException(
        { message: 'Incorrect password!' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    //step3: generate accessToken and refreshToken
    const payload = {
      id: user.id,
      name: user.full_name,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: 60,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
