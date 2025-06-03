// doctors.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DoctorsService } from './doctors.service';
import { Doctor, Doctor as DoctorsGraphQL } from './model/doctors.model';
import { CreateDoctorDto, RegisterDoctorInput, UpdateDoctorInput } from './dto/doctors.dto';
import { DoctorWithRelations } from './type/doctors.type';
import { AuthService } from '../auth/auth.service';

@Resolver(() => DoctorsGraphQL)
export class DoctorsResolver {
  constructor(
    private doctorsService: DoctorsService,
    private authService: AuthService,
) {}

  @Query(() => [DoctorsGraphQL])
  async doctors(): Promise<DoctorWithRelations[]> {
    return this.doctorsService.findAll();
  }

  @Query(() => DoctorsGraphQL, { nullable: true })
  async doctor(@Args('id') id: string): Promise<DoctorWithRelations> {
    return this.doctorsService.findOne(id);
  }

  @Mutation(() => DoctorsGraphQL)
  async createDoctor(@Args('doctorData') doctorData: CreateDoctorDto): Promise<DoctorWithRelations> {
    return this.doctorsService.create(doctorData);
  }

  @Mutation(() => Doctor)
  async createDoctorAndUser(@Args('input') input: RegisterDoctorInput): Promise<DoctorWithRelations> {
    return this.doctorsService.createDoctorAndUser(input);
  }


  @Mutation(() => DoctorsGraphQL)
  async deleteDoctor(@Args('id') id: string): Promise<DoctorWithRelations> {
    return this.doctorsService.delete(id);
  }

  @Mutation(() => DoctorsGraphQL)
  async updateDoctor(@Args('id') id: string, @Args('doctorData') doctorData: UpdateDoctorInput): Promise<DoctorWithRelations> {
    return this.doctorsService.update(id, doctorData);
  }
}
