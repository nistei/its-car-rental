import { Module } from '@nestjs/common';
import { MaintenanceReportsService } from './maintenance-reports.service';
import { MaintenanceReportsController } from './maintenance-reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceReport } from './entities/maintenance-report.entity';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceReport]), VehiclesModule],
  controllers: [MaintenanceReportsController],
  providers: [MaintenanceReportsService],
  exports: [MaintenanceReportsService],
})
export class MaintenanceReportsModule {}
