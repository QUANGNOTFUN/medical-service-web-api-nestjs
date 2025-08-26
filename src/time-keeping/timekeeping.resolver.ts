import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TimekeepingService } from './timekeeping.service';
import { CreateTimekeepingInput, Timekeeping, UpdateTimekeepingInput } from './types/timekeeping.type';

@Resolver(() => Timekeeping)
export class TimekeepingResolver {
  constructor(private readonly timekeepingService: TimekeepingService) {}

  @Query(() => [Timekeeping])
  timekeepings() {
    return this.timekeepingService.findAll();
  }

  @Query(() => Timekeeping, { nullable: true })
  timekeeping(@Args('id', { type: () => Int }) id: number) {
    return this.timekeepingService.findOne(id);
  }

  @Mutation(() => Timekeeping)
  createTimekeeping(@Args('data') data: CreateTimekeepingInput) {
    return this.timekeepingService.create(data);
  }

  @Mutation(() => Timekeeping)
  updateTimekeeping(@Args('data') data: UpdateTimekeepingInput) {
    return this.timekeepingService.update(data);
  }

  @Mutation(() => Timekeeping)
  removeTimekeeping(@Args('id', { type: () => Int }) id: number) {
    return this.timekeepingService.remove(id);
  }
}
