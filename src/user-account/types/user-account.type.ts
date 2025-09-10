import { Field, ObjectType, InputType, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class UserAccount {

  @Field()
  employee_id: string;

  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  phone?: string | null

  @Field()
  password: string;

  @Field(() => Int)
  role: number;

  @Field(() => String,{ nullable: true })
  note?: string | null;
}

@InputType()
export class CreateUserAccountInput {
  @Field()
  employee_id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  password: string;

  @Field(() => Int)
  role: number;

  @Field({ nullable: true })
  note?: string;
}

@InputType()
export class UpdateUserAccountInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => Int, { nullable: true })
  role?: number;

  @Field({ nullable: true })
  note?: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  email: string;

  @Field()
  otp: string;

  @Field()
  newPassword: string;
}