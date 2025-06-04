import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { GraphQLDate, GraphQLTimestamp } from 'graphql-scalars';
import { IsDate, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

@ObjectType()
export class Patient {
  @Field(() => ID)
  patient_id: string;

  @Field(() => GraphQLDate,{nullable: true})
  @IsDate({ message: 'date_of_birth phải là kiểu ngày' })
  date_of_birth?: Date;

  @Field(() => String)
  @IsString({ message: 'gender phải là chuỗi' })
  @IsNotEmpty({ message: 'gender không được để trống' })
  @Matches(/^(male|female|other)$/i, { message: 'gender phải là male, female hoặc other' })
  gender: string;

  @Field(() => GraphQLDate)
  @IsDate({ message: 'hiv_diagnosis_date phải là kiểu ngày' })
  hiv_diagnosis_date?: Date;

  @Field(() => GraphQLTimestamp)
  created_at: Date;

  @Field(() => GraphQLTimestamp, { nullable: true })
  updated_at?: Date;
}

@InputType()
export class CreatePatientInput {
  @Field(() => ID)
  patient_id: string;

  @Field(() => GraphQLDate,{nullable: true})
  @IsOptional()
  @IsDate({ message: 'date_of_birth phải là kiểu ngày' })
  date_of_birth?: Date;

  @Field(() => String)
  @IsString({ message: 'gender phải là chuỗi' })
  @IsNotEmpty({ message: 'gender không được để trống' })
  @Matches(/^(male|female|other)$/i, { message: 'gender phải là male, female hoặc other' })
  gender: string;

  @Field(() => GraphQLDate)
  @IsOptional()
  @IsDate({ message: 'hiv_diagnosis_date phải là kiểu ngày' })
  hiv_diagnosis_date?: Date;
}

@InputType()
export class UpdatePatientInput {
  @Field(() => String)
  @IsString({ message: 'patient_id phải là số chuoi' })
  @IsNotEmpty({ message: 'patient_id không được để trống' })
  patient_id: string;

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
  @Field(() => String)
  @IsString({ message: 'patient_id phải là chuôi' })
  @IsNotEmpty({ message: 'patient_id không được để trống' })
  patient_id: string;
}

@InputType()
export class DeletePatientInput {
  @Field(() => String)
  @IsString({ message: 'patient_id phải là chuôĩ' })
  @IsNotEmpty({ message: 'patient_id không được để trống' })
  patient_id: string;
}
