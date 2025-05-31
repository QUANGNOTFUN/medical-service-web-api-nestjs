import { Test, TestingModule } from '@nestjs/testing';
import { DoctorScheduleService } from './doctor_schedules.service';

describe('DoctorSchedulesService', () => {
  let service: DoctorScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorScheduleService],
    }).compile();

    service = module.get<DoctorScheduleService>(DoctorScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
