import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';
import { Employee } from '../../employee/types/employee.type';
import { OvertimeType } from '../../overtime-type/types/overtime-type.type';

@ObjectType()
export class Overtime {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  year: number;

  @Field(() => Int)
  month: number;

  @Field(() => Date)
  date: Date;

  @Field(() => Float)
  hours: number;

  @Field()
  employee_id: string;

  @Field(() => Int)
  overtime_type_id: number;

  @Field(() => Employee)
  employee: Employee;

  @Field(() => OvertimeType)
  overtimeType: OvertimeType;
}

@InputType()
export class CreateOvertimeInput {
  @Field(() => Int)
  year: number;

  @Field(() => Int)
  month: number;

  @Field(() => Date)
  date: Date;

  @Field(() => Float)
  hours: number;

  @Field()
  employee_id: string;

  @Field(() => Int)
  overtime_type_id: number;
}

@InputType()
export class UpdateOvertimeInput {
  @Field(() => Int, { nullable: true })
  year?: number;

  @Field(() => Int, { nullable: true })
  month?: number;

  @Field(() => Date, { nullable: true })
  date?: Date;

  @Field(() => Float, { nullable: true })
  hours?: number;

  @Field({ nullable: true })
  employee_id?: string;

  @Field(() => Int, { nullable: true })
  overtime_type_id?: number;
}
