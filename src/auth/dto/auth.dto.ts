import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail, IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../role/role.enum';

@InputType()
export class RegisterDto {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'phone phải là chuỗi' })
  phone?: string;

  @Field(() => String)
  @IsEmail({}, { message: 'email không đúng định dạng' })
  @IsNotEmpty({ message: 'email không được để trống' })
  email: string;

  @Field(() => String)
  @IsString({ message: 'password phải là chuỗi' })
  @IsNotEmpty({ message: 'password không được để trống' })
  password: string;

  @Field(() => String, {
    nullable: true,
    description: 'Role of the user',
    defaultValue: Role.USER,
  })
  @IsInt({ message: 'role phải là số' })
  @IsNotEmpty({ message: 'role không được để trống' })
  role: number;

  @Field(() => String)
  employee_id: string;
}

@InputType()
export class LoginDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}