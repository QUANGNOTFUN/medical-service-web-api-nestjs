import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';
import { Employee } from '../../employee/types/employee.type';
import { Allowance } from '../../allowance/types/allowance.type';

@ObjectType()
export class Employee_Allowance {
  @Field(() => Int)
  id: number;

  @Field()
  employee_id: string;

  @Field(() => Int)
  allowance_id: number;

  @Field()
  date: Date;

  @Field({ nullable: true })
  reason?: string;

  @Field(() => Float)
  amount: number;

  @Field(() => Employee, { nullable: true })
  employee?: Employee;

  @Field(() => Allowance, { nullable: true })
  allowance?: Allowance;
}

@InputType()
export class CreateEmployeeAllowanceInput {
  @Field()
  employee_id: string;

  @Field(() => Int)
  allowance_id: number;

  @Field()
  date: Date;

  @Field({ nullable: true })
  reason?: string;

  @Field(() => Float)
  amount: number;
}

@InputType()
export class UpdateEmployeeAllowanceInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  employee_id?: string;

  @Field(() => Int, { nullable: true })
  allowance_id?: number;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  reason?: string;

  @Field(() => Float, { nullable: true })
  amount?: number;
}
