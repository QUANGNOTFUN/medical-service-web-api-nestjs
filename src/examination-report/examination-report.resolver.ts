import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateExaminationReportInput, ExaminationReport } from './types/examination-report';
import { ExaminationReportService } from './examination-report.service';

@Resolver(() => ExaminationReport)
export class ExaminationReportResolver {
  constructor(private readonly service: ExaminationReportService) {}

  @Mutation(() => ExaminationReport)
  createExaminationReport(@Args('input') input: CreateExaminationReportInput) {
    return this.service.create(input);
  }

  @Query(() => [ExaminationReport])
  findAllExaminationReports() {
    return this.service.findAll();
  }

  @Query(() => ExaminationReport)
  findExaminationReport(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => ExaminationReport)
  deleteExaminationReport(@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id);
  }
}
