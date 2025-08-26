import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeeAllowanceService } from './employee-allowance.service';
import {
  CreateEmployeeAllowanceInput,
  Employee_Allowance,
  UpdateEmployeeAllowanceInput,
} from './types/employee-allowance.type';


@Resolver(() => Employee_Allowance)
export class EmployeeAllowanceResolver {
  constructor(private readonly service: EmployeeAllowanceService) {}

  @Mutation(() => Employee_Allowance)
  createEmployeeAllowance(@Args('data') data: CreateEmployeeAllowanceInput) {
    return this.service.create(data);
  }

  @Query(() => [Employee_Allowance])
  employeeAllowances() {
    return this.service.findAll();
  }

  @Query(() => Employee_Allowance, { nullable: true })
  employeeAllowance(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Employee_Allowance)
  updateEmployeeAllowance(@Args('data') data: UpdateEmployeeAllowanceInput) {
    return this.service.update(data);
  }

  @Mutation(() => Employee_Allowance)
  removeEmployeeAllowance(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
