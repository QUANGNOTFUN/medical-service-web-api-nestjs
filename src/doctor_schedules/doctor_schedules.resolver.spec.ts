import { Test, TestingModule } from '@nestjs/testing';
import { DoctorScheduleResolver } from './doctor_schedules.resolver';

describe('DoctorSchedulesResolver', () => {
  let resolver: DoctorScheduleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorScheduleResolver],
    }).compile();

    resolver = module.get<DoctorScheduleResolver>(DoctorScheduleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
