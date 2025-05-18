import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Medication {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  available_quantity: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}