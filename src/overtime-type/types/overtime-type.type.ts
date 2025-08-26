import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';
import { Overtime } from '../../overtime/types/overtime.type';

@ObjectType()
export class OvertimeType {
  @Field(() => Int)
  overtime_type_id: number;

  @Field()
  name: string;

  @Field(() => Float)
  coefficient: number;

  @Field(() => [Overtime], { nullable: true })
  overtimes?: Overtime[];
}

@InputType()
export class CreateOvertimeTypeInput {
  @Field()
  name: string;

  @Field(() => Float)
  coefficient: number;
}

@InputType()
export class UpdateOvertimeTypeInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  coefficient?: number;
}
