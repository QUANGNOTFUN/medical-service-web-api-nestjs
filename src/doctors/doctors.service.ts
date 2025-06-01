import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/doctors.dto';
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
    data: CreateDoctorDto,
  ): Promise<DoctorWithRelations> {
    return this.prisma.doctors.update({
      where: { id },
      data,
      include: {
        user: true,
        schedule: true,
      },
    });
  }
}
