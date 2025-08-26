import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkTypeService } from './work-type.service';
import { CreateWorkTypeInput, UpdateWorkTypeInput, WorkType } from './types/work-type.type';

@Resolver(() => WorkType)
export class WorkTypeResolver {
  constructor(private readonly workTypeService: WorkTypeService) {}

  @Query(() => [WorkType])
  workTypes() {
    return this.workTypeService.findAll();
  }

  @Query(() => WorkType, { nullable: true })
  workType(@Args('id', { type: () => Int }) id: number) {
    return this.workTypeService.findOne(id);
  }

  @Mutation(() => WorkType)
  createWorkType(@Args('data') data: CreateWorkTypeInput) {
    return this.workTypeService.create(data);
  }

  @Mutation(() => WorkType)
  updateWorkType(@Args('data') data: UpdateWorkTypeInput) {
    return this.workTypeService.update(data);
  }

  @Mutation(() => WorkType)
  removeWorkType(@Args('id', { type: () => Int }) id: number) {
    return this.workTypeService.remove(id);
  }
}
