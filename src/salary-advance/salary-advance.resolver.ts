import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SalaryAdvanceService } from './salary-advance.service';
import { CreateSalaryAdvanceInput, SalaryAdvance, UpdateSalaryAdvanceInput } from './types/salary-advance.type';
import { PrismaService } from '../prisma/prisma.service';


@Resolver(() => SalaryAdvance)
export class SalaryAdvanceResolver {
  constructor(
    private readonly service: SalaryAdvanceService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => SalaryAdvance)
  createSalaryAdvance(@Args('createSalaryAdvanceInput') input: CreateSalaryAdvanceInput) {
    return this.service.create(input);
  }

  @Query(() => [SalaryAdvance], { name: 'salaryAdvances' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => SalaryAdvance, { name: 'salaryAdvance', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => SalaryAdvance)
  updateSalaryAdvance(@Args('updateSalaryAdvanceInput') input: UpdateSalaryAdvanceInput) {
    return this.service.update(input);
  }

  @Mutation(() => SalaryAdvance)
  removeSalaryAdvance(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }

  @ResolveField('employee')
  employee(@Parent() sa: SalaryAdvance) {
    return this.prisma.employee.findUnique({ where: { employee_id: sa.employee_id } });
  }
}
