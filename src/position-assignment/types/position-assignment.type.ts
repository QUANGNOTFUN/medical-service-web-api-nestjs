import { ObjectType, Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Employee } from '../../employee/types/employee.type';
import { Department } from '../../department/types/department.type';
import { Position } from '../../position/types/position.type';

/**
 * GraphQL Object Type for PositionAssignment
 * Composite key: (employee_id, department_id, position_id)
 */
@ObjectType()
export class PositionAssignment {
  @Field(() => ID)
  employee_id: string;

  @Field(() => String)
  department_id: string;

  @Field(() => String)
  position_id: string;

  @Field(() => String, { nullable: true })
  department_name?: string;

  @Field(() => String, { nullable: true })
  position_name?: string;

  // Relations
  @Field(() => Employee, { nullable: true })
  employee?: Employee;

  @Field(() => Department, { nullable: true })
  department?: Department;

  @Field(() => Position, { nullable: true })
  position?: Position;
}

@InputType()
export class CreatePositionAssignmentInput {
  @Field(() => String)
  employee_id: string;

  @Field(() => String)
  department_id: string;

  @Field(() => String)
  position_id: string;
}


@InputType()
export class UpdatePositionAssignmentInput extends PartialType(CreatePositionAssignmentInput) {
  @Field(() => String)
  employee_id: string;

  @Field(() => String)
  department_id: string;

  @Field(() => String)
  position_id: string;
}
