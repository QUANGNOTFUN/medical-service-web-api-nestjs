import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AllowanceService } from './allowance.service';
import { Allowance, CreateAllowanceInput, UpdateAllowanceInput } from './types/allowance.type';

@Resolver(() => Allowance)
export class AllowanceResolver {
  constructor(private readonly service: AllowanceService) {}

  @Mutation(() => Allowance)
  createAllowance(@Args('data') data: CreateAllowanceInput) {
    return this.service.create(data);
  }

  @Query(() => [Allowance])
  allowances() {
    return this.service.findAll();
  }

  @Query(() => Allowance, { nullable: true })
  allowance(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Allowance)
  updateAllowance(@Args('data') data: UpdateAllowanceInput) {
    return this.service.update(data);
  }

  @Mutation(() => Allowance)
  removeAllowance(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
