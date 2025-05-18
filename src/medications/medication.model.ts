import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';



@InputType()
export class CreateMedicationInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  available_quantity: number;
}

@InputType()
export class UpdateMedicationInput {
  @Field({nullable: true})
  name?: string;

  @Field(() => Int, {nullable: true})
  price?: number;

  @Field(() => Int, {nullable: true})
  available_quantity?: number;
}