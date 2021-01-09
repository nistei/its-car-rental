import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MaintenanceReportsService } from './maintenance-reports.service';
import { CreateMaintenanceReportDto } from './dto/create-maintenance-report.dto';
import { UpdateMaintenanceReportDto } from './dto/update-maintenance-report.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@ApiTags('maintenance-reports')
@Controller('api/v1/maintenance-reports')
@ApiSecurity('jwt')
export class MaintenanceReportsController {
  constructor(private readonly maintenanceReportsService: MaintenanceReportsService) {}

  @Post()
  @Roles(Role.Mechanic)
  create(@Body() createMaintenanceReportDto: CreateMaintenanceReportDto) {
    return this.maintenanceReportsService.create(createMaintenanceReportDto);
  }

  @Get()
  @Roles(Role.Mechanic, Role.FleetManager)
  findAll() {
    return this.maintenanceReportsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Mechanic, Role.FleetManager)
  findOne(@Param('id') id: string) {
    return this.maintenanceReportsService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.Mechanic)
  update(@Param('id') id: string, @Body() updateMaintenanceReportDto: UpdateMaintenanceReportDto) {
    return this.maintenanceReportsService.update(+id, updateMaintenanceReportDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.maintenanceReportsService.remove(+id);
  }
}
