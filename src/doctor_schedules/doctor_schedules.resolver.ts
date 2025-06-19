import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DoctorSchedule } from './model/doctor_schedules.model';
import { CreateDoctorDto_Schedules } from './dto/doctor_schedules.dto';
import { DoctorScheduleService } from './doctor_schedules.service';

@Resolver(() => DoctorSchedule)
export class DoctorScheduleResolver {
  constructor(private doctorScheduleService: DoctorScheduleService) {}

  @Query(() => [DoctorSchedule], { name: 'doctorSchedules' })
  async doctorSchedules(): Promise<DoctorSchedule[]> {
    return this.doctorScheduleService.findAll();
  }

  @Mutation(() => DoctorSchedule)
  async createDoctorSchedule(
    @Args('doctorData') doctorData: CreateDoctorDto_Schedules,
  ): Promise<DoctorSchedule> {
    return this.doctorScheduleService.create(doctorData);
  }

  @Mutation(() => DoctorSchedule)
  async deleteDoctorSchedule(@Args('id', { type: () => String }) schedule_id: number): Promise<DoctorSchedule> {
    return this.doctorScheduleService.delete(schedule_id);
  }

  @Mutation(() => DoctorSchedule)
  async updateDoctorSchedule(
    @Args('id', { type: () => String }) schedule_id: number,
    @Args('doctorData') doctorData: CreateDoctorDto_Schedules,
  ): Promise<DoctorSchedule> {
    return this.doctorScheduleService.update(schedule_id, doctorData);
  }
}