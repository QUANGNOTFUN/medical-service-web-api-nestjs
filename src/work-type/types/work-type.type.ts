import { ObjectType, Field, Int, Float, InputType, PartialType } from '@nestjs/graphql';

@ObjectType()
export class WorkType {
  @Field(() => Int)
  work_type_id: number;

  @Field()
  name: string;

  @Field(() => Float)
  coefficient: number;
}

@InputType()
export class CreateWorkTypeInput {
  @Field()
  name: string;

  @Field(() => Float)
  coefficient: number;
}

@InputType()
export class UpdateWorkTypeInput extends PartialType(CreateWorkTypeInput) {
  @Field(() => Int)
  work_type_id: number;
}
