import { ApiProperty } from '@nestjs/swagger';

export class CreateMaintenanceReportDto {
  @ApiProperty({ description: 'The vehicle the report refers to' })
  vehicle: number;

  @ApiProperty({ description: 'The detailed info about the report' })
  details: string;

  @ApiProperty({ description: 'Whether issues were found or not' })
  hadIssues: boolean;
}
