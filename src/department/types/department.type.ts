import { ObjectType, Field, ID, InputType, PartialType } from '@nestjs/graphql';

@ObjectType()
export class Department {
  @Field(() => ID)
  department_id: string;

  @Field(() => String)
  department_name: string;
}

@InputType()
export class CreateDepartmentInput {
  @Field(() => String)
  department_id: string;

  @Field(() => String)
  department_name: string;
}

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => String)
  department_id: string;
}
