import { Module } from '@nestjs/common';
import { MaintenanceReportsService } from './maintenance-reports.service';
import { MaintenanceReportsController } from './maintenance-reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceReport } from './entities/maintenance-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceReport])],
  controllers: [MaintenanceReportsController],
  providers: [MaintenanceReportsService],
  exports: [MaintenanceReportsService],
})
export class MaintenanceReportsModule {}
