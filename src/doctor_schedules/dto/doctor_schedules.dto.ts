// doctor_schedules.dto.ts

import { InputType, Field } from '@nestjs/graphql';
import { IsInt, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { GraphQLDate } from 'graphql-scalars';

@InputType()
export class CreateDoctorDto_Schedules {
  @Field(() => String)
  @IsInt()
  doctor_id: string;

  @Field(() => GraphQLDate, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start_time?: Date;

  @Field(() => GraphQLDate, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end_time?: Date;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}
