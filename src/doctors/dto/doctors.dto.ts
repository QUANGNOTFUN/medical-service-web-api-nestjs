import { IsString, IsInt, Min, IsOptional } from 'class-validator';
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
  @IsString()
  specialty?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  hospital?: string;
}