import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceReportsController } from './maintenance-reports.controller';
import { MaintenanceReportsService } from './maintenance-reports.service';

describe('MaintenanceReportsController', () => {
  let controller: MaintenanceReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceReportsController],
      providers: [MaintenanceReportsService],
    }).compile();

    controller = module.get<MaintenanceReportsController>(MaintenanceReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
