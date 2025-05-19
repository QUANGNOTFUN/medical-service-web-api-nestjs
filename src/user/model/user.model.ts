import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Unique identifier for the user' })
  id: string;

  @Field(() => String, { description: 'Full name of the user' })
  full_name: string;

  @Field(() => String)
  email: string;

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
  updated_at?: Date;
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
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  full_name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  gender: string;

  @Field(() => GraphQLDate, { nullable: true })
  @IsOptional()
  date_of_birth?: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3)
  full_name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  gender?: string;

  @Field(() => GraphQLDate, { nullable: true })
  @IsOptional()
  @IsDateString()
  date_of_birth?: string;
}
