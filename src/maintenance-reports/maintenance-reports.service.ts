import { HttpException, Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { CreateMaintenanceReportDto } from './dto/create-maintenance-report.dto';
import { UpdateMaintenanceReportDto } from './dto/update-maintenance-report.dto';
import { MaintenanceReport } from './entities/maintenance-report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { VehiclesService } from '../vehicles/vehicles.service';

@Injectable()
export class MaintenanceReportsService {
  private readonly logger = new Logger(MaintenanceReportsService.name);

  constructor(
    @InjectRepository(MaintenanceReport)
    private readonly reports: Repository<MaintenanceReport>,
    private readonly vehicles: VehiclesService,
  ) {
  }

  async create(createMaintenanceReportDto: CreateMaintenanceReportDto, mechanic: User): Promise<MaintenanceReport> {
    this.logger.log('Creating new maintenance report');

    const vehicle = await this.vehicles.findOne(createMaintenanceReportDto.vehicle);

    return await this.reports.save({
      vehicle,
      mechanic,
      details: createMaintenanceReportDto.details,
      hadIssues: createMaintenanceReportDto.hadIssues,
    });
  }

  // TODO: Paginate
  findAll(): Promise<MaintenanceReport[]> {
    return this.reports.find();
  }

  async findOne(id: number): Promise<MaintenanceReport> {
    const report = await this.reports.findOne(id);

    if (!report) {
      throw new HttpException(`Report with id ${id} not found`, 404);
    }

    return report;
  }

  // TODO: Implement
  update(id: number, updateMaintenanceReportDto: UpdateMaintenanceReportDto): Promise<MaintenanceReport> {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
