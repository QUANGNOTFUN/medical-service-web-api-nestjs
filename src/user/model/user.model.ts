import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import { IsDate, IsDateString, IsNotEmpty, IsString, MinLength } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Unique identifier for the user' })
  id: string;

  @Field(() => String, { description: 'Full name of the user' })
  full_name: string;

  @Field(() => String, { nullable: true, description: 'Phone number of the user' })
  phone?: string;

  @Field(() => String, { nullable: true, description: 'Address of the user' })
  address?: string;

  @Field(() => String, { description: 'Gender of the user' })
  gender: string;

  @Field(() => GraphQLDate, { nullable: true, description: 'Date of birth of the user' })
  date_of_birth?: Date;

  @Field(() => GraphQLDate, { description: 'Creation date of the user record' })
  created_at: Date;

  @Field(() => GraphQLDate, { description: 'Last update date of the user record' })
  updated_at: Date;
}

@ObjectType()
export class UserPaginationResponse {
  @Field(() => [User], { description: 'List of users' })
  data: User[];

  @Field(() => Int, { description: 'Total number of users' })
  total: number;

  @Field(() => Int, { description: 'Current page number' })
  currentPage: number;

  @Field(() => Int, { description: 'Number of items per page' })
  itemsPerPage: number;
}

@InputType()
export class GetUserByIdInput {
  @Field(() => ID, { description: 'ID of the user to retrieve' })
  @IsString({ message: 'ID phải là chuỗi' })
  @IsNotEmpty({ message: 'ID không được để trống' })
  id: string;
}

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Full name of the user' })
  @IsString({ message: 'Tên đầy đủ phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên đầy đủ không được để trống' })
  @MinLength(3, { message: 'Tên đầy đủ phải có ít nhất 3 ký tự' })
  full_name: string;

  @Field(() => String, { nullable: true, description: 'Phone number of the user' })
  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  phone: string;

  @Field(() => String, { nullable: true, description: 'Address of the user' })
  @IsString({ message: 'Địa chỉ phải là chuỗi' })
  address: string;

  @Field(() => String, { description: 'Gender of the user' })
  @IsString({ message: 'Giới tính phải là chuỗi' })
  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  gender: string;

  @Field(() => GraphQLDate, { nullable: true })
  @IsDate({ message: 'Ngày sinh phải là định dạng ngày hợp lệ' }) // ✅ Đổi dòng này
  date_of_birth: Date;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true, description: 'Full name of the user' })
  @IsString({ message: 'Tên đầy đủ phải là chuỗi' })
  @MinLength(3, { message: 'Tên đầy đủ phải có ít nhất 3 ký tự' })
  full_name?: string;

  @Field(() => String, { nullable: true, description: 'Phone number of the user' })
  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  phone?: string;

  @Field(() => String, { nullable: true, description: 'Address of the user' })
  @IsString({ message: 'Địa chỉ phải là chuỗi' })
  address?: string;

  @Field(() => String, { nullable: true, description: 'Gender of the user' })
  @IsString({ message: 'Giới tính phải là chuỗi' })
  gender?: string;

  @Field(() => GraphQLDate, { nullable: true, description: 'Date of birth of the user' })
  @IsDateString({}, { message: 'Ngày sinh phải là định dạng ngày hợp lệ' })
  date_of_birth?: Date;
}
