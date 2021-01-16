import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { MaintenanceReportsService } from './maintenance-reports.service';
import { CreateMaintenanceReportDto } from './dto/create-maintenance-report.dto';
import { UpdateMaintenanceReportDto } from './dto/update-maintenance-report.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { MaintenanceReportDto } from './dto/maintenance-report.dto';

@ApiTags('maintenance-reports')
@Controller('api/v1/maintenance-reports')
@ApiSecurity('jwt')
export class MaintenanceReportsController {
  constructor(private readonly maintenanceReportsService: MaintenanceReportsService) {}

  @Post()
  @Roles(Role.Mechanic)
  create(@Body() createMaintenanceReportDto: CreateMaintenanceReportDto, @Request() req): Promise<MaintenanceReportDto> {
    return this.maintenanceReportsService.create(createMaintenanceReportDto, req.user).then(MaintenanceReportDto.map);
  }

  @Get()
  @Roles(Role.Mechanic, Role.FleetManager)
  findAll() {
    return this.maintenanceReportsService.findAll().then(MaintenanceReportDto.mapList);
  }

  @Get(':id')
  @Roles(Role.Mechanic, Role.FleetManager)
  findOne(@Param('id') id: string) {
    return this.maintenanceReportsService.findOne(+id).then(MaintenanceReportDto.map);
  }

  @Put(':id')
  @Roles(Role.Mechanic)
  update(@Param('id') id: string, @Body() updateMaintenanceReportDto: UpdateMaintenanceReportDto) {
    return this.maintenanceReportsService.update(+id, updateMaintenanceReportDto).then(MaintenanceReportDto.map);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.maintenanceReportsService.remove(+id);
  }
}
