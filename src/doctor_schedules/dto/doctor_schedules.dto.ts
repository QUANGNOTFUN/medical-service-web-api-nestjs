import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateDoctorDto_Schedules {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  doctor_id: number;

  @Field(() => Date, { nullable: true })
  start_time: Date;

  @Field(() => Date, { nullable: true })
  end_time: Date;

  @Field(() => Boolean, { nullable: true })
  is_available: boolean;
}