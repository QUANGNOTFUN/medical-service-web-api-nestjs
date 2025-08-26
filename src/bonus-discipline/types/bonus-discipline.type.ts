import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class BonusDiscipline {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  decision_number?: string;

  @Field({ nullable: true })
  reason?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field()
  employee_id: string;

  @Field({ nullable: true })
  type?: string;
}

@InputType()
export class CreateBonusDisciplineInput {
  @Field({ nullable: true })
  decision_number?: string;

  @Field({ nullable: true })
  reason?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field()
  employee_id: string;

  @Field({ nullable: true })
  type?: string;
}

@InputType()
export class UpdateBonusDisciplineInput {
  @Field({ nullable: true })
  decision_number?: string;

  @Field({ nullable: true })
  reason?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  type?: string;
}
