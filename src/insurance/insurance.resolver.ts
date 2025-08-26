import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InsuranceService } from './insurance.service';
import { CreateInsuranceInput, Insurance, UpdateInsuranceInput } from './types/insurance.type';

@Resolver(() => Insurance)
export class InsuranceResolver {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Mutation(() => Insurance)
  createInsurance(@Args('data') data: CreateInsuranceInput) {
    return this.insuranceService.create(data);
  }

  @Query(() => [Insurance])
  insurances() {
    return this.insuranceService.findAll();
  }

  @Query(() => Insurance, { nullable: true })
  insurance(@Args('id', { type: () => Int }) id: number) {
    return this.insuranceService.findOne(id);
  }

  @Mutation(() => Insurance)
  updateInsurance(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateInsuranceInput,
  ) {
    return this.insuranceService.update(id, data);
  }

  @Mutation(() => Insurance)
  removeInsurance(@Args('id', { type: () => Int }) id: number) {
    return this.insuranceService.remove(id);
  }
}
