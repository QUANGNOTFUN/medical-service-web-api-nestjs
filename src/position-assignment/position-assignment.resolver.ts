import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { PositionAssignmentService } from './position-assignment.service';
import {
  CreatePositionAssignmentInput,
  PositionAssignment,
  UpdatePositionAssignmentInput,
} from './types/position-assignment.type';
import { Employee } from '@prisma/client';

@Resolver(() => PositionAssignment)
export class PositionAssignmentResolver {
  constructor(private readonly service: PositionAssignmentService) {}

  @Mutation(() => PositionAssignment)
  createPositionAssignment(
    @Args('createPositionAssignmentInput')
    createPositionAssignmentInput: CreatePositionAssignmentInput,
  ) {
    return this.service.create(createPositionAssignmentInput);
  }

  @Query(() => [PositionAssignment], { name: 'positionAssignments' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => PositionAssignment, {
    name: 'positionAssignment',
    nullable: true,
  })
  findOne(
    @Args('employee_id') employee_id: string,
    @Args('department_id') department_id: string,
    @Args('position_id') position_id: string,
  ) {
    return this.service.findOne(employee_id, department_id, position_id);
  }

  @Mutation(() => PositionAssignment)
  updatePositionAssignment(
    @Args('updatePositionAssignmentInput')
    updatePositionAssignmentInput: UpdatePositionAssignmentInput,
  ) {
    return this.service.update(updatePositionAssignmentInput);
  }

  @Mutation(() => PositionAssignment)
  removePositionAssignment(
    @Args('employee_id') employee_id: string,
    @Args('department_id') department_id: string,
    @Args('position_id') position_id: string,
  ) {
    return this.service.remove(employee_id, department_id, position_id);
  }

}
