import { Args, Query, Resolver } from '@nestjs/graphql';
import { MedicationsService } from './medications.service';
import { GetMedicationByIdInput, Medication } from './types/medication.type';
import { NotFoundException } from '@nestjs/common';
import { GraphQLError } from 'graphql/error';

@Resolver()
export class MedicationsResolver {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Query(() => [Medication], {name: 'medications'})
  async getMedications(): Promise<Medication[]> {
    return this.medicationsService.getMedications();
  }

  @Query(() => Medication, {name: 'medication'})
  async getMedicationById(@Args('input') input: GetMedicationByIdInput): Promise<Medication> {
    try {
      return await this.medicationsService.getMedicationById(input.id);
    }catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new GraphQLError(errorMessage, {
        extensions: {
          code: error instanceof NotFoundException ? 'Không tìm thấy' : 'INTERNAL_SERVER_ERROR',
          originalError: error,
        },
      })
    }
  }
}
