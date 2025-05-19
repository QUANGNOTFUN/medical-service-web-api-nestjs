import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Medication } from '@prisma/client';
import { Int32 } from 'typeorm';

@Injectable()
export class MedicationsService {
  private readonly logger = new Logger(MedicationsService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getMedications(): Promise<Medication[]> {
    return this.prisma.medication.findMany();
  }

  async getMedicationById(id: number): Promise<Medication> {
    try {
      const medication = await this.prisma.medication.findUnique({
        where: { id: id },
      });
      if (!medication) {
        throw new NotFoundException('Không tìm thấy thuốc này');
      }
      return medication;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Lỗi khi lấy thuốc với ID ${id}: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }
}
