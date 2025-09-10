import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LeaveType, CreateLeaveTypeInput, UpdateLeaveTypeInput } from './types/leave-type.type';
import { LeaveTypeService } from './leave-type.service';

@Resolver(() => LeaveType)
export class LeaveTypeResolver {
  constructor(private readonly leaveTypeService: LeaveTypeService) {}

  @Query(() => [LeaveType])
  async getLeaveTypes() {
    return this.leaveTypeService.findAll();
  }

  @Mutation(() => LeaveType)
  async createLeaveType(@Args('data') data: CreateLeaveTypeInput) {
    return this.leaveTypeService.create(data);
  }

  @Mutation(() => LeaveType)
  async updateLeaveType(@Args('data') data: UpdateLeaveTypeInput) {
    return this.leaveTypeService.update(data);
  }
}
