import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import { Doctor } from '../../doctors/model/doctors.model';

@ObjectType()
export class DoctorSchedule {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  doctor_id: string;

  @Field(() => GraphQLDate)
  start_time: Date | null;

  @Field(() => GraphQLDate)
  end_time: Date | null;

  @Field(() => Boolean, { nullable: true })
  is_available: boolean | null;

  @Field(() => GraphQLDate, { description: 'Creation date of the user record' })
  created_at: Date;

  @Field(() => Doctor, { nullable: true })
  doctor?: Doctor;
}