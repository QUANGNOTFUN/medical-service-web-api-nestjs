import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLTimestamp } from 'graphql-scalars';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class Appointment {
  @Field(() => ID)
  appointment_id: number;

  @Field(() => String)
  patient_id: string;

  @Field(() => String)
  doctor_id: string;

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

  @Field(() => String,{nullable : true})
  notes?: string;

  @Field(() => GraphQLTimestamp)
  created_at: Date;

  @Field(() => GraphQLTimestamp, { nullable: true })
  updated_at?: Date;
}

@InputType()
export class PaginationAppointmentInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => String, { nullable: true })
  doctor_id: string;
}


@ObjectType()
export class PaginatedAppointment {
  @Field(() => [Appointment])
  items: Appointment[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalPages: number;
}

@InputType()
export class CreateAppointmentInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  patient_id: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  doctor_id: string;

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
  appointment_id: number;


  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: string;
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
