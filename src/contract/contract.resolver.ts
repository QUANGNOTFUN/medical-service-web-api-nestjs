import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ContractService } from './contract.service';
import { Contract, CreateContractInput, UpdateContractInput } from './types/contract.type';
import { PrismaService } from '../prisma/prisma.service';


@Resolver(() => Contract)
export class ContractResolver {
  constructor(
    private readonly service: ContractService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Contract)
  createContract(@Args('createContractInput') input: CreateContractInput) {
    return this.service.create(input);
  }

  @Query(() => [Contract], { name: 'contracts' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => Contract, { name: 'contract', nullable: true })
  findOne(@Args('contract_id', { type: () => Int }) contract_id: number) {
    return this.service.findOne(contract_id);
  }

  @Mutation(() => Contract)
  updateContract(@Args('updateContractInput') input: UpdateContractInput) {
    return this.service.update(input);
  }

  @Mutation(() => Contract)
  removeContract(@Args('contract_id', { type: () => Int }) contract_id: number) {
    return this.service.remove(contract_id);
  }

  @ResolveField('employee')
  employee(@Parent() c: Contract) {
    return this.prisma.employee.findUnique({ where: { employee_id: c.employee_id } });
  }
}
