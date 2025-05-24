import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Doctors } from '@prisma/client';
import { CreateDoctorDto } from './dto/doctors.dto';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async create(dataDoctor: CreateDoctorDto): Promise<Doctors> {
    return this.prisma.doctors.create({ data: dataDoctor });
  }

  async findAll(): Promise<Doctors[]> {
    return this.prisma.doctors.findMany();
  }

  async findOne(id: string): Promise<Doctors | null> {
    return this.prisma.doctors.findUnique({
      where: { id },
    });
  }

  async delete(id:string): Promise<Doctors> {
    return this.prisma.doctors.delete({
      where: { id },
    });
  }

  async update(id: string, data: CreateDoctorDto): Promise<Doctors> {
    return this.prisma.doctors.update({
      where: { id },
      data,
    });
  }
}