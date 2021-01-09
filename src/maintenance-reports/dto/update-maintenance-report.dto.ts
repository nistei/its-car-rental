import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintenanceReportDto } from './create-maintenance-report.dto';

export class UpdateMaintenanceReportDto extends PartialType(CreateMaintenanceReportDto) {}
