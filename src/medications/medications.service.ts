import { Injectable, NotFoundException, Logger, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Medication, Prisma } from '@prisma/client';
import {
  CreateMedicationInput,
  UpdateMedicationInput,
} from './types/medication.type';

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

  async createMedication(input: CreateMedicationInput) {
    try {
      return await this.prisma.medication.create({
        data: input,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException(
          'Thuốc đã tồn tại. Vui lòng nhập tên thuốc khác.',
        );
      }
      this.logger.error('Lỗi khi tạo thuốc mới:');
      throw error;
    }
  }

  async updateMedication(id: number, input: UpdateMedicationInput) {
    try {
      return await this.prisma.medication.update({
        where: { id: id },
        data: {
          ...input,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Không tìm thấy thuốc này');
        }
        throw new ConflictException(
          'Thuốc đã tồn tại. Vui lòng nhập tên thuốc khác.',
        );
      }

      this.logger.error('Lỗi khi cập nhật thuốc:');
      throw error;
    }
  }

  async removeMedication(id: number) {
    try {
      return await this.prisma.medication.delete({
        where: { id: id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Không tìm thấy thuốc này');
        }
      }
    }
  }
}
