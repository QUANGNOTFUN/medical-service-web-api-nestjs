import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsResolver } from './doctors.resolver';

describe('DoctorsResolver', () => {
  let resolver: DoctorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorsResolver],
    }).compile();

    resolver = module.get<DoctorsResolver>(DoctorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
