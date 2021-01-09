import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceReportsService } from './maintenance-reports.service';

describe('MaintenanceReportsService', () => {
  let service: MaintenanceReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceReportsService],
    }).compile();

    service = module.get<MaintenanceReportsService>(MaintenanceReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
