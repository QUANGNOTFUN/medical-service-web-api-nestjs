import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateAppointmentInput, DeleteAppointmentInput, GetAppointmentByIdInput } from './types/appointments.type';
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

  @Mutation(() => Boolean)
  deleteAppointment(@Args('input') input: DeleteAppointmentInput) {
    return this.appointmentService.remove(input.appointment_id).then(() => true);
  }
}
