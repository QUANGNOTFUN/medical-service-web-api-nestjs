import { Field, ObjectType, Int } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import { User } from '../../user/types/user.type';
import { DoctorSchedule } from '../../doctor_schedules/model/doctor_schedules.model';

@ObjectType()
export class Doctor {
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

  @Field(() => GraphQLDate, { description: 'Creation date of the doctor record' })
  created_at: Date;

  @Field(() => GraphQLDate, { nullable: true, description: 'Last update date of the doctor record' })
  updated_at: Date | null;

  // 👇 Quan hệ đến bảng users
  @Field(() => User, { description: 'Related user information' })
  user: User;

  // 👇 Quan hệ đến bảng doctor_schedules (có thể không có)
  @Field(() => DoctorSchedule, { nullable: true, description: 'Doctor\'s schedule (if any)' })
  schedule: DoctorSchedule | null;
}


