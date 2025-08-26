import { ObjectType, Field, Int, InputType, PartialType } from '@nestjs/graphql';
import { Employee } from '../../employee/types/employee.type';

@ObjectType()
export class Contract {
  @Field(() => Int)
  contract_id: number;

  @Field(() => String)
  start_date: Date | string;

  @Field(() => String)
  end_date: Date | string;

  @Field(() => String)
  sign_date: Date | string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Number)
  salary_level: number;

  @Field(() => Int)
  duration: number;

  @Field(() => String)
  contract_type: string;

  @Field(() => String)
  employee_id: string;

  @Field(() => Employee, { nullable: true })
  employee?: Employee;
}

@InputType()
export class CreateContractInput {
  @Field(() => String)
  start_date: Date | string;

  @Field(() => String)
  end_date: Date | string;

  @Field(() => String)
  sign_date: Date | string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Number)
  salary_level: number;

  @Field(() => Int)
  duration: number;

  @Field(() => String)
  contract_type: string;

  @Field(() => String)
  employee_id: string;
}

@InputType()
export class UpdateContractInput extends PartialType(CreateContractInput) {
  @Field(() => Int)
  contract_id: number;
}
