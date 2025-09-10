import { ObjectType, Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Employee } from '../../employee/types/employee.type';
import { PositionAssignment } from '../../position-assignment/types/position-assignment.type';

@ObjectType()
export class Department {
  @Field(() => ID)
  department_id: string;

  @Field(() => String)
  department_name: string;

  @Field(() => [Employee], { nullable: true })
  employees?: Employee[];

  @Field(() => [PositionAssignment], { nullable: true })
  positionAssignments?: PositionAssignment[];

}

@InputType()
export class CreateDepartmentInput {
  @Field(() => String)
  department_name: string;
}

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => String)
  department_id: string;
}
