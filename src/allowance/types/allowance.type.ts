import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';

@ObjectType()
export class Allowance {
  @Field(() => Int)
  allowance_id: number;

  @Field()
  name: string;

  @Field(() => Float)
  amount: number;
}

@InputType()
export class CreateAllowanceInput {
  @Field()
  name: string;

  @Field(() => Float)
  amount: number;
}

@InputType()
export class UpdateAllowanceInput {
  @Field(() => Int)
  allowance_id: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  amount?: number;
}
