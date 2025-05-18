import { Query, Resolver } from '@nestjs/graphql';
import { MedicationsService } from './medications.service';
import { Medication } from './types/medication.type';

@Resolver()
export class MedicationsResolver {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Query(() => [Medication], {name: 'medications'})
  async getMedications(): Promise<Medication[]> {
    return this.medicationsService.getMedications();
  }
}
