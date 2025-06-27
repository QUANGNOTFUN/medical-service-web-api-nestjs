import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import { Days, ShiftType } from './doctor_schedules.dto';
import { User } from '../../user/types/user.type';

@ObjectType()
export class DoctorSchedule {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  doctor_id: string;

  @Field(() => Days)
  day: string;

  @Field(() => ShiftType)
  shift: string;

  @Field(() => GraphQLDate)
  start_time: Date;

  @Field(() => GraphQLDate)
  end_time: Date;

  @Field(() => Boolean, { nullable: true })
  is_available: boolean | null;

  @Field(() => GraphQLDate, { description: 'Creation date of the user record' })
  created_at: Date;

  @Field(() => User, { nullable: false })
  user: User;
}

export type DoctorScheduleResponse = DoctorSchedule & {
  doctor: {
    user: User
  }
};