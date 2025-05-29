import { Resolver } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';

@Resolver()
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}
}
