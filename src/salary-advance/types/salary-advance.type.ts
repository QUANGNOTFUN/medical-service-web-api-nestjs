import { ObjectType, Field, Int, InputType, PartialType } from '@nestjs/graphql';
import { Employee } from '../../employee/types/employee.type';

@ObjectType()
export class SalaryAdvance {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  year: number;

  @Field(() => Int)
  month: number;

  @Field(() => String)
  date: Date | string;

  @Field(() => Number)
  amount: number;

  @Field(() => String)
  status: string;

  @Field(() => String)
  employee_id: string;

  @Field(() => Employee, { nullable: true })
  employee?: Employee;
}

@InputType()
export class CreateSalaryAdvanceInput {
  @Field(() => Int)
  year: number;

  @Field(() => Int)
  month: number;

  @Field(() => String)
  date: Date | string;

  @Field(() => Number)
  amount: number;

  @Field(() => String)
  status: string;

  @Field(() => String)
  employee_id: string;
}

@InputType()
export class UpdateSalaryAdvanceInput extends PartialType(CreateSalaryAdvanceInput) {
  @Field(() => Int)
  id: number;
}
