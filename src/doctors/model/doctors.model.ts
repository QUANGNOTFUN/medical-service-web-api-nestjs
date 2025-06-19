import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import { User } from '../../user/types/user.type';
import { DoctorSchedule } from '../../doctor_schedules/model/doctor_schedules.model';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

@ObjectType()
export class Doctor {
  @Field(() => String)
  id: string;

  @Field(() => String,{nullable: true})
  @IsString()
  @IsOptional()
  qualifications: string;
  
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  specialty: string;

  @Field(() => Int)
  work_seniority: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  hospital: string;

  @Field(() => Float, { defaultValue: 0 })
  @IsNumber()
  default_fee: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  titles?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  positions?: string;

  @Field(() => Float, { defaultValue: 0 })
  @IsNumber()
  rating: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'gender phải là chuỗi' })
  @IsNotEmpty({ message: 'gender không được để trống' })
  gender: string;

  @Field(() => GraphQLDate, { description: 'Creation date of the doctor record' })
  created_at: Date;

  @Field(() => GraphQLDate, { nullable: true, description: 'Last update date of the doctor record' })
  updated_at: Date | null;

  // 👇 Quan hệ đến bảng users
  @Field(() => User, { description: 'Related user information' })
  user: User;

  // 👇 Quan hệ đến bảng doctor_schedules (có thể không có)
  @Field(() => DoctorSchedule, { nullable: true, description: 'Doctor\'s schedule (if any)' })
  schedules: DoctorSchedule | null;
}


