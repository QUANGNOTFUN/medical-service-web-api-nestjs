// doctor_schedules.dto.ts

import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsBoolean, IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateDoctorDto_Schedules {
  @Field(() => String)
  @IsUUID()
  doctor_id: string;

  @IsOptional()
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  start_time: Date;

  @IsOptional()
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  end_time: Date;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  is_available: boolean;
}
