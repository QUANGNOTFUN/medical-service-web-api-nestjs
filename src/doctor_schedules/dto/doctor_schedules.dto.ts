// doctor_schedules.dto.ts

import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, IsBoolean, IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateDoctorDto_Schedules {
  @Field(() => String)
  @IsUUID()
  doctor_id: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start_time: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end_time: Date;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}
