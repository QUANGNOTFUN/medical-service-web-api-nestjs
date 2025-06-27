import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  DoctorSchedule,
  DoctorScheduleResponse,
} from './types/doctor_schedules.model';
import { DoctorScheduleService } from './doctor_schedules.service';
import { CreateDoctorScheduleInput } from './types/doctor_schedules.dto';
import { WeekDateInput } from './types/week_date_input.type';

@Resolver(() => DoctorSchedule)
export class DoctorScheduleResolver {
  constructor(private doctorScheduleService: DoctorScheduleService) {}

  @Query(() => [DoctorSchedule])
  async getDoctorScheduleByWeekDate(@Args('input') weekDate: WeekDateInput): Promise<DoctorScheduleResponse[]> {
    return this.doctorScheduleService.getDoctorScheduleByWeekDate(weekDate);
  }

  @Query(() => [DoctorSchedule])
  async getDoctorSchedulesIdByDate(
    @Args('doctor_id', { type: () => String }) doctor_id: string,
    @Args('date', { type: () => String }) date: string,
  ) {
    return this.doctorScheduleService.findSchedulesByDoctorAndDate(doctor_id, date);
  }

  @Query(() => [String])
  async getAvailableScheduleDates(
    @Args('doctor_id', { type: () => String }) doctor_id: string,
  ): Promise<string[]> {
    return this.doctorScheduleService.getAvailableScheduleDates(doctor_id);
  }

  @Mutation(() => DoctorSchedule)
  async createDoctorSchedule(
    @Args('input') scheduleInput: CreateDoctorScheduleInput,
  ) {
    return this.doctorScheduleService.create(scheduleInput);
  }

  @Mutation(() => DoctorSchedule)
  async deleteDoctorSchedule(
    @Args('id', { type: () => String }) schedule_id: number,
  ): Promise<DoctorSchedule> {
    return this.doctorScheduleService.delete(schedule_id);
  }

  @Mutation(() => DoctorSchedule)
  async updateDoctorSchedule(
    @Args('id', { type: () => String }) schedule_id: number,
    @Args('doctorData') doctorData: CreateDoctorScheduleInput,
  ): Promise<DoctorSchedule> {
    return this.doctorScheduleService.update(schedule_id, doctorData);
  }
}