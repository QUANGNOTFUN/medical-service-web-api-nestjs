import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMedications(): Promise<{
    available_quantity: number;
    created_at: Date;
    id: number;
    name: string;
    price: number;
    updated_at: Date
  }[]> {
    const medications = await this.prisma.medication.findMany();
    return medications.map(medication => ({
      ...medication,
      price: parseFloat(medication.price.toString()),
    }))
  }
}
