import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import {
  CreateAppointmentInput,
  DeleteAppointmentInput,
  GetAppointmentByIdInput,
  GetAppointmentByPatientIdInput,
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

  @Query(() => Appointment)
  findOneAppointment(@Args('input') input: GetAppointmentByIdInput) {
    return this.appointmentService.findOne(input.appointment_id);
  }

  @Query(() => [Appointment])
  findAppointmentByPatientId(@Args('input') input: GetAppointmentByPatientIdInput) {
    return this.appointmentService.getAppointmentByPatientId(input.patient_id);
  }

  @Mutation(() => Appointment)
  async updateAppointmentStatus(
    @Args('appointmentId', { type: () => Int }) appointmentId: number,
    @Args('newStatus', { type: () => String }) newStatus: string,
  ): Promise<Appointment> {
    // @ts-ignore
    return this.appointmentService.updateStatus(appointmentId, newStatus);
  }

  @Mutation(() => Boolean)
  async deleteAppointment(@Args('input') input: DeleteAppointmentInput) {
    await this.appointmentService.remove(input.appointment_id);
    return true;
  }
}
