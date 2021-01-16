import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { Public } from '../decorators/public.decorator';
import { VehicleDto } from './dto/vehicle.dto';

@ApiTags('vehicles')
@Controller('api/v1/vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @Roles(Role.FleetManager)
  @ApiSecurity('jwt')
  create(@Body() createVehicleDto: CreateVehicleDto): Promise<VehicleDto> {
    return this.vehiclesService.create(createVehicleDto).then(VehicleDto.map);
  }

  @Get()
  @Public()
  findAll(): Promise<VehicleDto[]> {
    return this.vehiclesService.findAll().then(VehicleDto.mapList);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<VehicleDto> {
    return this.vehiclesService.findOne(+id).then(VehicleDto.map);
  }

  @Put(':id')
  @Roles(Role.FleetManager)
  @ApiSecurity('jwt')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto): Promise<VehicleDto> {
    return this.vehiclesService.update(+id, updateVehicleDto).then(VehicleDto.map);
  }

  @Delete(':id')
  @Roles(Role.FleetManager)
  @ApiSecurity('jwt')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
