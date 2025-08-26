import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OvertimeTypeService } from './overtime-type.service';
import { CreateOvertimeTypeInput, OvertimeType, UpdateOvertimeTypeInput } from './types/overtime-type.type';

@Resolver(() => OvertimeType)
export class OvertimeTypeResolver {
  constructor(private service: OvertimeTypeService) {}

  @Query(() => [OvertimeType])
  overtimeTypes() {
    return this.service.findAll();
  }

  @Query(() => OvertimeType, { nullable: true })
  overtimeType(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => OvertimeType)
  createOvertimeType(@Args('data') data: CreateOvertimeTypeInput) {
    return this.service.create(data);
  }

  @Mutation(() => OvertimeType)
  updateOvertimeType(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateOvertimeTypeInput,
  ) {
    return this.service.update(id, data);
  }

  @Mutation(() => OvertimeType)
  deleteOvertimeType(@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id);
  }
}
