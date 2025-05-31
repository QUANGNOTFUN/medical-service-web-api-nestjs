// --------------------- TYPES ---------------------
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLTimestamp } from 'graphql-scalars';

@ObjectType()
export class ExaminationReport {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  doctor_id: number;

  @Field()
  risk_assessment: string;

  @Field()
  is_HIV: boolean;

  @Field()
  HIV_test_file: string;

  @Field(() => Int)
  regimen_id: number;

  @Field(() => Int, { nullable: true })
  treatment_plan_id?: number;

  @Field(() => GraphQLTimestamp)
  created_at: Date;

  @Field(() => GraphQLTimestamp, { nullable: true })
  updated_at?: Date;
}

@InputType()
export class CreateExaminationReportInput {
  @Field()
  name: string;

  @Field(() => Int)
  doctor_id: number;

  @Field()
  risk_assessment: string;

  @Field()
  is_HIV: boolean;

  @Field()
  HIV_test_file: string;

  @Field(() => Int)
  regimen_id: number;

  @Field(() => Int, { nullable: true })
  treatment_plan_id?: number;
}
