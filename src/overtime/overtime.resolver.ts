import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateOvertimeInput, Overtime, UpdateOvertimeInput } from './types/overtime.type';
import { OvertimeService } from './overtime.service';


@Resolver(() => Overtime)
export class OvertimeResolver {
  constructor(private service: OvertimeService) {}

  @Query(() => [Overtime])
  overtimes() {
    return this.service.findAll();
  }

  @Query(() => Overtime, { nullable: true })
  overtime(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Overtime)
  createOvertime(@Args('data') data: CreateOvertimeInput) {
    return this.service.create(data);
  }

  @Mutation(() => Overtime)
  updateOvertime(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateOvertimeInput,
  ) {
    return this.service.update(id, data);
  }

  @Mutation(() => Overtime)
  deleteOvertime(@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id);
  }
}
