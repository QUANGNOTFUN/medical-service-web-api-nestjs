import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LeaveService } from './leave.service';
import { Leave, CreateLeaveInput, UpdateLeaveInput } from './types/leave.type';

@Resolver(() => Leave)
export class LeaveResolver {
  constructor(private readonly leaveService: LeaveService) {}

  @Query(() => [Leave])
  async getLeaves() {
    return this.leaveService.findAll();
  }

  @Query(() => [Leave])
  async getLeavesByEmployee(@Args('employee_id') employee_id: string) {
    return this.leaveService.findByEmployee(employee_id);
  }

  @Mutation(() => Leave)
  async createLeave(@Args('data') data: CreateLeaveInput) {
    return this.leaveService.create(data);
  }

  @Mutation(() => Leave)
  async updateLeave(
    @Args('id') leave_id: number,
    @Args('data') data: UpdateLeaveInput,
  ) {
    return this.leaveService.update({ leave_id, data });
  }

  @Mutation(() => Leave)
  async approveLeave(@Args('id', { type: () => Int }) id: number) {
    return this.leaveService.approve(id);
  }

  @Mutation(() => Leave)
  async rejectLeave(@Args('id', { type: () => Int }) id: number) {
    return this.leaveService.reject(id);
  }
}
