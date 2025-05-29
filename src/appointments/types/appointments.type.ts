import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLTimestamp } from 'graphql-scalars';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  appointment_type: string;

  @Field(() => GraphQLTimestamp)
  appointment_date: Date;

  @Field(() => String)
  status: string;

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
  @IsInt()
  @IsNotEmpty()
  patient_id: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  doctor_id: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  schedule_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  appointment_type: string;

  @Field(() => GraphQLTimestamp)
  @IsNotEmpty()
  appointment_date: Date;

  @Field(() => String)
  @IsOptional()
  @IsString()
  status: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsOptional()
  is_anonymous?: boolean;
}

@InputType()
export class UpdateAppointmentInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  appointment_id: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  appointment_type?: string;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @IsOptional()
  appointment_date?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  is_anonymous?: boolean;
}

@InputType()
export class GetAppointmentByIdInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  appointment_id: number;
}

@InputType()
export class DeleteAppointmentInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  appointment_id: number;
}
