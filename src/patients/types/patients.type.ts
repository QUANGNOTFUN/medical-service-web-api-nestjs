import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLDate, GraphQLTimestamp } from 'graphql-scalars';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

@ObjectType()
export class Patient {
  @Field(() => ID)
  patient_id: number;

  @Field(() => String)
  @IsString({ message: 'user_id phải là chuỗi' })
  user_id: string;

  @Field(() => String)
  @IsString({ message: 'anonymous_id phải là chuỗi' })
  @IsNotEmpty({ message: 'anonymous_id không được để trống' })
  anonymous_id: string;

  @Field(() => GraphQLDate)
  @IsDate({ message: 'date_of_birth phải là kiểu ngày' })
  @IsNotEmpty({ message: 'date_of_birth không được để trống' })
  date_of_birth: Date;

  @Field(() => String)
  @IsString({ message: 'gender phải là chuỗi' })
  @IsNotEmpty({ message: 'gender không được để trống' })
  @Matches(/^(male|female|other)$/i, { message: 'gender phải là male, female hoặc other' })
  gender: string;

  @Field(() => GraphQLDate)
  @IsDate({ message: 'hiv_diagnosis_date phải là kiểu ngày' })
  @IsNotEmpty({ message: 'hiv_diagnosis_date không được để trống' })
  hiv_diagnosis_date: Date;

  @Field(() => GraphQLTimestamp)
  created_at: Date;

  @Field(() => GraphQLTimestamp, { nullable: true })
  updated_at?: Date;
}

@InputType()
export class CreatePatientInput {
  @Field(() => String)
  @IsString({ message: 'user_id phải là số nguyên' })
  @IsNotEmpty({ message: 'user_id không được để trống' })
  user_id: string;

  @Field(() => String)
  @IsString({ message: 'anonymous_id phải là chuỗi' })
  @IsNotEmpty({ message: 'anonymous_id không được để trống' })
  anonymous_id: string;

  @Field(() => GraphQLDate)
  @IsNotEmpty({ message: 'date_of_birth không được để trống' })
  @IsDate({ message: 'date_of_birth phải là kiểu ngày' })
  date_of_birth: Date;

  @Field(() => String)
  @IsString({ message: 'gender phải là chuỗi' })
  @IsNotEmpty({ message: 'gender không được để trống' })
  @Matches(/^(male|female|other)$/i, { message: 'gender phải là male, female hoặc other' })
  gender: string;

  @Field(() => GraphQLDate)
  @IsNotEmpty({ message: 'hiv_diagnosis_date không được để trống' })
  @IsDate({ message: 'hiv_diagnosis_date phải là kiểu ngày' })
  hiv_diagnosis_date: Date;
}

@InputType()
export class UpdatePatientInput {
  @Field(() => Int)
  @IsInt({ message: 'patient_id phải là số nguyên' })
  @IsNotEmpty({ message: 'patient_id không được để trống' })
  patient_id: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'anonymous_id phải là chuỗi' })
  anonymous_id?: string;

  @Field(() => GraphQLDate, { nullable: true })
  @IsOptional()
  @IsDate({ message: 'date_of_birth phải là kiểu ngày' })
  date_of_birth?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'gender phải là chuỗi' })
  @Matches(/^(male|female|other)$/i, { message: 'gender phải là male, female hoặc other' })
  gender?: string;

  @Field(() => GraphQLDate, { nullable: true })
  @IsOptional()
  @IsDate({ message: 'hiv_diagnosis_date phải là kiểu ngày' })
  hiv_diagnosis_date?: Date;
}

@InputType()
export class GetPatientByIdInput {
  @Field(() => Int)
  @IsInt({ message: 'patient_id phải là số nguyên' })
  @IsNotEmpty({ message: 'patient_id không được để trống' })
  patient_id: number;
}

@InputType()
export class DeletePatientInput {
  @Field(() => Int)
  @IsInt({ message: 'patient_id phải là số nguyên' })
  @IsNotEmpty({ message: 'patient_id không được để trống' })
  patient_id: number;
}
