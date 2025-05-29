// doctors.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DoctorsService } from './doctors.service';
import { Doctor as DoctorsGraphQL } from './model/doctors.model';
import { CreateDoctorDto } from './dto/doctors.dto';
import { DoctorWithRelations } from './type/doctors.type';

@Resolver(() => DoctorsGraphQL)
export class DoctorsResolver {
  constructor(private doctorsService: DoctorsService) {}

  @Query(() => [DoctorsGraphQL])
  async doctors(): Promise<DoctorWithRelations[]> {
    return this.doctorsService.findAll();
  }

  @Query(() => DoctorsGraphQL, { nullable: true })
  async doctor(@Args('id') id: number): Promise<DoctorWithRelations> {
    return this.doctorsService.findOne(id);
  }

  @Mutation(() => DoctorsGraphQL)
  async createDoctor(@Args('doctorData') doctorData: CreateDoctorDto): Promise<DoctorWithRelations> {
    return this.doctorsService.create(doctorData);
  }

  @Mutation(() => DoctorsGraphQL)
  async deleteDoctor(@Args('id') id: number): Promise<DoctorWithRelations> {
    return this.doctorsService.delete(id);
  }

  @Mutation(() => DoctorsGraphQL)
  async updateDoctor(@Args('id') id: number, @Args('doctorData') doctorData: CreateDoctorDto): Promise<DoctorWithRelations> {
    return this.doctorsService.update(id, doctorData);
  }
}
