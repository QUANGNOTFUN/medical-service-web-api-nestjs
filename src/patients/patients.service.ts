import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientInput, UpdatePatientInput } from './types/patients.type';
import { Patient as PrismaPatient } from '@prisma/client';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreatePatientInput): Promise<PrismaPatient> {
    return this.prisma.patient.create({
      data: { ...input },
    });
  }

  async findAll(): Promise<PrismaPatient[]> {
    return this.prisma.patient.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: number): Promise<PrismaPatient> {
    const patient = await this.prisma.patient.findUnique({
      where: { patient_id: id },
    });
    if (!patient) {
      throw new NotFoundException(`Patient #${id} not found`);
    }
    return patient;
  }

  async update(id: number, input: UpdatePatientInput): Promise<PrismaPatient> {
    await this.findOne(id); // ensure exists
    return this.prisma.patient.update({
      where: { patient_id: id },
      data: { ...input, updated_at: new Date() },
    });
  }

  async remove(id: number): Promise<PrismaPatient> {
    await this.findOne(id); // ensure exists
    return this.prisma.patient.delete({
      where: { patient_id: id },
    });
  }
}
