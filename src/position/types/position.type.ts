import { ObjectType, Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Employee } from '../../employee/types/employee.type';
import { PositionAssignment } from '../../position-assignment/types/position-assignment.type';

@ObjectType()
export class Position {
  @Field(() => ID)
  position_id: string;

  @Field(() => String)
  position_name: string;

  @Field(() => [Employee], { nullable: true })
  employees?: Employee[];

  @Field(() => [PositionAssignment], { nullable: true })
  positionAssignments?: PositionAssignment[];
}

@InputType()
export class CreatePositionInput {
  @Field(() => String)
  position_name: string;
}

@InputType()
export class UpdatePositionInput extends PartialType(CreatePositionInput) {
  @Field(() => String)
  position_id: string;
}
