import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BonusDisciplineService } from './bonus-discipline.service';
import { BonusDiscipline, CreateBonusDisciplineInput, UpdateBonusDisciplineInput } from './types/bonus-discipline.type';

@Resolver(() => BonusDiscipline)
export class BonusDisciplineResolver {
  constructor(private readonly service: BonusDisciplineService) {}

  @Mutation(() => BonusDiscipline)
  createBonusDiscipline(@Args('data') data: CreateBonusDisciplineInput) {
    return this.service.create(data);
  }

  @Query(() => [BonusDiscipline])
  bonusDisciplines() {
    return this.service.findAll();
  }

  @Query(() => BonusDiscipline, { nullable: true })
  bonusDiscipline(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => BonusDiscipline)
  updateBonusDiscipline(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateBonusDisciplineInput,
  ) {
    return this.service.update(id, data);
  }

  @Mutation(() => BonusDiscipline)
  removeBonusDiscipline(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
