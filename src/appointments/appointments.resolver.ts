import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateAppointmentInput,
  DeleteAppointmentInput,
  GetAppointmentByIdInput,
  PaginatedAppointment, PaginationAppointmentInput, UpdateAppointmentInput,
} from './types/appointments.type';
import { Appointment } from './types/appointments.type';
import { AppointmentService } from './appointments.service';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Mutation(() => Appointment)
  createAppointment(@Args('input') input: CreateAppointmentInput) {
    return this.appointmentService.create(input);
  }

  @Query(() => [Appointment])
  findAllAppointments() {
    return this.appointmentService.findAll();
  }

  @Query(() => PaginatedAppointment)
  getAppointmentsByDoctor(@Args("input") input: PaginationAppointmentInput): Promise<PaginatedAppointment>{
    return this.appointmentService.findAllByDoctorId(input.doctor_id,input.page,input.pageSize);
  }

  @Query(() => Appointment)
  findOneAppointment(@Args('input') input: GetAppointmentByIdInput) {
    return this.appointmentService.findOne(input.appointment_id);
  }

  @Mutation(() => Boolean)
  async updateAppointment(
    @Args('input') input: UpdateAppointmentInput
  ) {
    try {
      await this.appointmentService.update(input);
      return true;
    } catch (error) {
      console.error("Update failed:", error);
      return false;
    }
  }



  @Mutation(() => Boolean)
  async deleteAppointment(@Args('input') input: DeleteAppointmentInput) {
    await this.appointmentService.remove(input.appointment_id);
    return true;
  }
}
