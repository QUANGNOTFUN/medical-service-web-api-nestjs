import { Field, ObjectType, Int } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';

@ObjectType()
export class Doctors {
  @Field(() => String)
  id: string;

  @Field(() => String)
  user_id: string;

  @Field(() => String, { nullable: true })
  qualifications: string | null;

  @Field(() => Int, { nullable: true })
  work_seniority: number | null;

  @Field(() => String, { nullable: true })
  specialty: string | null;

  @Field(() => String, { nullable: true })
  hospital: string | null;

  @Field(() => GraphQLDate, { description: 'Creation date of the user record' })
  created_at: Date;

  @Field(() => GraphQLDate, { nullable: true, description: 'Last update date of the user record' })
  updated_at: Date | null;
}