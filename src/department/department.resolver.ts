import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department, CreateDepartmentInput, UpdateDepartmentInput } from './types/department.type';
import { Employee } from '../employee/types/employee.type';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly service: DepartmentService) {}

  @Mutation(() => Department)
  createDepartment(@Args('createDepartmentInput') input: CreateDepartmentInput) {
    return this.service.create(input);
  }

  @Query(() => [Department], { name: 'departments' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => Department, { name: 'department', nullable: true })
  findOne(@Args('department_id') department_id: string) {
    return this.service.findOne(department_id);
  }

  @Mutation(() => Department)
  updateDepartment(@Args('updateDepartmentInput') input: UpdateDepartmentInput) {
    return this.service.update(input);
  }

  @Mutation(() => Department)
  removeDepartment(@Args('department_id') department_id: string) {
    return this.service.remove(department_id);
  }
}
