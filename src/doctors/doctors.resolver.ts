import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DoctorsService } from './doctors.service';
import { Doctors } from './model/doctors.model';
import { CreateDoctorDto } from './dto/doctors.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Doctors)
export class DoctorsResolver {
  constructor(private doctorsService: DoctorsService) {}

  @Query(() => [Doctors])
  async doctors(): Promise<Doctors[]> {
    return this.doctorsService.findAll();
  }

  @Query(() => Doctors, { nullable: true })
  async doctor(@Args('id') id: string): Promise<Doctors> {
    const doctor = await this.doctorsService.findOne(id);
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  @Mutation(() => Doctors)
  async createDoctor(@Args('doctorData') doctorData: CreateDoctorDto): Promise<Doctors> {
    return this.doctorsService.create(doctorData);
  }

  @Mutation(() => Doctors)
  async deleteDoctor(@Args('id') id: string): Promise<Doctors> {
    return this.doctorsService.delete(id);
  }

  @Mutation(() => Doctors)
  async updateDoctor(@Args('id') id: string, @Args('doctorData') doctorData: CreateDoctorDto): Promise<Doctors> {
    return this.doctorsService.update(id, doctorData);
  }
}