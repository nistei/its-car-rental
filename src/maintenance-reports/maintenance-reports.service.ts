import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateMaintenanceReportDto } from './dto/create-maintenance-report.dto';
import { UpdateMaintenanceReportDto } from './dto/update-maintenance-report.dto';

@Injectable()
export class MaintenanceReportsService {
  // TODO: Implement
  create(createMaintenanceReportDto: CreateMaintenanceReportDto) {
    throw new NotImplementedException();
  }

  // TODO: Implement
  findAll() {
    throw new NotImplementedException();
  }

  // TODO: Implement
  findOne(id: number) {
    throw new NotImplementedException();
  }

  // TODO: Implement
  update(id: number, updateMaintenanceReportDto: UpdateMaintenanceReportDto) {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
