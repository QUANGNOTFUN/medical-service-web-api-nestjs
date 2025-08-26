import { ObjectType, Field, ID, InputType, PartialType } from '@nestjs/graphql';

@ObjectType()
export class Position {
  @Field(() => ID)
  position_id: string;

  @Field(() => String)
  position_name: string;
}

@InputType()
export class CreatePositionInput {
  @Field(() => String)
  position_id: string;

  @Field(() => String)
  position_name: string;
}

@InputType()
export class UpdatePositionInput extends PartialType(CreatePositionInput) {
  @Field(() => String)
  position_id: string;
}
