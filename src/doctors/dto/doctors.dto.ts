import { IsString, IsInt, Min, IsOptional, IsNotEmpty } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateDoctorDto {
  @Field(() => String)
  @IsString()
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  qualifications?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  work_seniority?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'gender phải là chuỗi' })
  @IsNotEmpty({ message: 'gender không được để trống' })
  gender: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  specialty?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  hospital?: string;
}

@InputType()
export class RegisterDoctorInput {
  @Field() full_name: string;
  @Field() email: string;
  @Field() password: string;
  @Field() role: string;
  @Field() gender: string;
}

@InputType()
export class UpdateDoctorInput {
  @Field({ nullable: true }) full_name: string;
  @Field({ nullable: true }) email: string;
  @Field({ nullable: true }) gender: string;
  // thêm các trường doctor
  @Field({ nullable: true }) qualifications?: string;
  @Field({ nullable: true }) work_seniority?: number;
  @Field({ nullable: true }) specialty?: string;
  @Field({ nullable: true }) hospital?: string;
}
