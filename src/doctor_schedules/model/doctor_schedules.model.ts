import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';

@ObjectType()
export class DoctorSchedule {
  @Field(() => Int, { nullable: true })
  id: number | null;

  @Field(() => Int, { nullable: true })
  doctor_id: number | null;

  @Field(() => GraphQLDate, { nullable: true })
  start_time: Date | null;

  @Field(() => GraphQLDate, { nullable: true })
  end_time: Date | null;

  @Field(() => Boolean, { nullable: true })
  is_available: boolean | null;

  @Field(() => GraphQLDate, { description: 'Creation date of the user record' })
  created_at: Date;
}