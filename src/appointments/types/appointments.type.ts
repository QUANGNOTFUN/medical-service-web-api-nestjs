import { Field, ID, InputType, ObjectType, Int } from '@nestjs/graphql';
import { GraphQLTimestamp } from 'graphql-scalars';
import { Doctor } from '../../doctors/model/doctors.model';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {Patient} from "../../patients/types/patients.type";

@ObjectType()
export class Appointment {
  @Field(() => ID)
  appointment_id: number;

  @Field(() => String)
  patient_id: string;

  @Field(() => String)
  doctor_id: string;

  @Field(() => Int)
  slot_id: number;

  @Field(() => String)
  appointment_type: string;

  @Field(() => GraphQLTimestamp)
  appointment_date: Date;

  @Field(() => String)
  status: string;

  @Field(() => Boolean)
  is_anonymous: boolean;

  @Field(() => String, { nullable: true })
  notes?: string | null;

  @Field(() => GraphQLTimestamp)
  created_at: Date;

  @Field(() => GraphQLTimestamp, { nullable: true })
  updated_at?: Date | null;

  @Field(() => Patient)
  patient: Patient;
}

@InputType()
export class PaginationAppointmentInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => String, { nullable: true })
  doctor_id: string;

  @Field(() => Doctor, { nullable: true })
  doctor: Doctor; // Quan hệ với Doctors
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
  @IsNotEmpty()
  slot_id: number;

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
  status?: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsOptional()
  is_anonymous?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  notes?: string | null;

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
  is_done?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  is_anonymous?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  notes?: string;

  @Field(() => Doctor, { nullable: true })
  @IsOptional()
  doctor?: Doctor | null;
}

// InputType mới cho việc cập nhật trạng thái
@InputType()
export class UpdateAppointmentStatusInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  appointment_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsIn(['PENDING', 'COMPLETED', 'CANCELLED'], { message: 'Trạng thái phải là PENDING, COMPLETED hoặc CANCELLED' })
  status: string;
}

// InputType cho việc lấy appointment theo ID
@InputType()
export class GetAppointmentByIdInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  appointment_id: number;
}

// InputType cho việc lấy appointment theo patient_id
@InputType()
export class GetAppointmentByPatientIdInput {
  @Field(() => String)
  @IsString({ message: 'patient_id phải là chuỗi' })
  @IsNotEmpty({ message: 'patient_id không được để trống' })
  patient_id: string;
}

// InputType cho việc xóa appointment
@InputType()
export class DeleteAppointmentInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  appointment_id: number;
}
