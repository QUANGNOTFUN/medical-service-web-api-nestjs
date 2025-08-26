import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PositionService } from './position.service';
import { Position, CreatePositionInput, UpdatePositionInput } from './types/position.type';

@Resolver(() => Position)
export class PositionResolver {
  constructor(private readonly service: PositionService) {}

  @Mutation(() => Position)
  createPosition(@Args('createPositionInput') input: CreatePositionInput) {
    return this.service.create(input);
  }

  @Query(() => [Position], { name: 'positions' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => Position, { name: 'position', nullable: true })
  findOne(@Args('position_id') position_id: string) {
    return this.service.findOne(position_id);
  }

  @Mutation(() => Position)
  updatePosition(@Args('updatePositionInput') input: UpdatePositionInput) {
    return this.service.update(input);
  }

  @Mutation(() => Position)
  removePosition(@Args('position_id') position_id: string) {
    return this.service.remove(position_id);
  }
}
