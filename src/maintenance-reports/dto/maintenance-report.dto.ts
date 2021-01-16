import { BaseDto } from '../../common/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MaintenanceReport } from '../entities/maintenance-report.entity';

export class MaintenanceReportDto extends BaseDto {
  @ApiProperty({ description: 'The vehicle the report refers to' })
  vehicle: number;

  @ApiProperty({ description: 'The mechanic working on the maintenance' })
  mechanic: number;

  @ApiProperty({ description: 'The detailed info about the report' })
  details: string;

  @ApiProperty({ description: 'Whether issues were found or not' })
  hadIssues: boolean;

  public static map(report: MaintenanceReport): MaintenanceReportDto {
    return {
      ...report,
      vehicle: report.vehicle?.id,
      mechanic: report.mechanic?.id,
    };
  }

  public static mapList(reports: MaintenanceReport[]): MaintenanceReportDto[] {
    return reports.map(MaintenanceReportDto.map);
  }
}
