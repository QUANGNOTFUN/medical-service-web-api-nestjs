
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateDoctorDto_Schedules {
  @Field(() => String)
  doctor_id: string;

  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  start_time: Date;

  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  end_time: Date;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  is_available: boolean;
}
