
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExaminationReportInput } from './types/examination-report';

@Injectable()
export class ExaminationReportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateExaminationReportInput) {
    return this.prisma.examinationReport.create({ data: input });
  }

  async findAll() {
    return this.prisma.examinationReport.findMany();
  }

  async findOne(id: number) {
    const report = await this.prisma.examinationReport.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('Examination report not found');
    return report;
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.prisma.examinationReport.delete({ where: { id } });
  }
}
