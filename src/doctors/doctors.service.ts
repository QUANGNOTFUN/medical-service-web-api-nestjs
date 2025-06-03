import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto, RegisterDoctorInput, UpdateDoctorInput } from './dto/doctors.dto';
import { DoctorWithRelations } from './type/doctors.type';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async create(dataDoctor: CreateDoctorDto): Promise<DoctorWithRelations> {
    return this.prisma.doctors.create({
      data: dataDoctor,
      include: {
        user: true,
        schedule: true,
      },
    });
  }

  async createDoctorAndUser(input: RegisterDoctorInput): Promise<DoctorWithRelations> {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: input.email,
          password: input.password,
          role: 'DOCTOR',
          full_name: input.full_name,
          gender: input.gender,
        },
      });

      // 2. Tạo doctor, dùng chính id của user
      const doctor = await tx.doctors.create({
        data: {
          id: user.id, // dùng id của user làm id doctor
          qualifications: input.qualifications,
          work_seniority: input.work_seniority,

          specialty: input.specialty,
          hospital: input.hospital,
        },
        include: {
          user: true,
          schedule: true,
        },
      });
      return doctor;
    });
  }


  async findAll(): Promise<DoctorWithRelations[]> {
    return this.prisma.doctors.findMany({
      include: {
        user: true,
        schedule: true,
      },
    });
  }

  async findOne(id: string): Promise<DoctorWithRelations> {
    const doctor = await this.prisma.doctors.findUnique({
      where: { id },
      include: {
        user: true,
        schedule: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return doctor;
  }

  async delete(id: string): Promise<DoctorWithRelations> {
    return this.prisma.doctors.delete({
      where: { id },
      include: {
        user: true,
        schedule: true,
      },
    });
  }

  async update(
    id: string,
    data: UpdateDoctorInput,
  ): Promise<DoctorWithRelations> {
    return this.prisma.doctors.update({
      where: { id },
      data: {
        qualifications: data.qualifications,
        work_seniority: data.work_seniority,
        specialty: data.specialty,
        hospital: data.hospital,
        user: {
          update: {
            full_name: data.full_name,
            email: data.email,
            gender: data.gender,
          },
        },
      },
      include: { user: true, schedule: true },
    });

  }
}
