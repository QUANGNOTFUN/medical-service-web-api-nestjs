import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLTimestamp } from 'graphql-scalars';

@ObjectType()
export class Appointment {
  @Field(() => ID)
  appointment_id: number;

  @Field(() => Int)
  patient_id: number;

  @Field(() => Int)
  doctor_id: number;

  @Field(() => Int)
  schedule_id: number;

  @Field(() => String)
  appointment_type: 'consultation' | 'treatment' | 'follow-up';

  @Field(() => GraphQLTimestamp)
  appointment_date: Date;

  @Field(() => String)
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';

  @Field(() => Boolean)
  is_anonymous: boolean;

  @Field(() => GraphQLTimestamp)
  created_at: Date;

  @Field(() => GraphQLTimestamp, { nullable: true })
  updated_at?: Date;
}

@InputType()
export class CreateAppointmentInput {
  @Field(() => Int)
  patient_id: number;

  @Field(() => Int)
  doctor_id: number;

  @Field(() => Int)
  schedule_id: number;

  @Field(() => String)
  appointment_type: string;

  @Field(() => GraphQLTimestamp)
  appointment_date: Date;

  @Field(() => String, { defaultValue: 'pending' })
  status?: string;

  @Field(() => Boolean, { defaultValue: false })
  is_anonymous?: boolean;
}
