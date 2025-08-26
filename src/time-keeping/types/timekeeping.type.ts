import { ObjectType, Field, Int, Float, InputType, PartialType } from '@nestjs/graphql';
import { Employee } from '../../employee/types/employee.type';
import { WorkType } from '../../work-type/types/work-type.type';

@ObjectType()
export class Timekeeping {
  @Field(() => Int)
  timekeeping_id: number;

  @Field(() => Int)
  year: number;

  @Field(() => Int)
  month: number;

  @Field()
  date: Date;

  @Field({ nullable: true })
  checkin?: Date;

  @Field({ nullable: true })
  checkout?: Date;

  @Field(() => Float, { nullable: true })
  work_hours?: number;

  @Field(() => Float, { nullable: true })
  leave_hours?: number;

  @Field()
  employee_id: string;

  @Field(() => Int)
  work_type_id: number;

  @Field(() => Employee)
  employee: Employee;

  @Field(() => WorkType)
  workType: WorkType;
}

@InputType()
export class CreateTimekeepingInput {
  @Field(() => Int)
  year: number;

  @Field(() => Int)
  month: number;

  @Field()
  date: Date;

  @Field({ nullable: true })
  checkin?: Date;

  @Field({ nullable: true })
  checkout?: Date;

  @Field(() => Float, { nullable: true })
  work_hours?: number;

  @Field(() => Float, { nullable: true })
  leave_hours?: number;

  @Field()
  employee_id: string;

  @Field(() => Int)
  work_type_id: number;
}

@InputType()
export class UpdateTimekeepingInput extends PartialType(CreateTimekeepingInput) {
  @Field(() => Int)
  timekeeping_id: number;
}
