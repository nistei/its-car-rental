import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { VehicleCategoriesService } from './vehicle-categories.service';
import { CreateVehicleCategoryDto } from './dto/create-vehicle-category.dto';
import { UpdateVehicleCategoryDto } from './dto/update-vehicle-category.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { Public } from '../decorators/public.decorator';
import { VehicleCategoryDto } from './dto/vehicle-category.dto';

@ApiTags('vehicle-categories')
@Controller('api/v1/vehicle-categories')
export class VehicleCategoriesController {
  constructor(private readonly vehicleCategoriesService: VehicleCategoriesService) {}

  @Post()
  @Roles(Role.FleetManager)
  @ApiSecurity('jwt')
  create(@Body() createVehicleCategoryDto: CreateVehicleCategoryDto): Promise<VehicleCategoryDto> {
    return this.vehicleCategoriesService.create(createVehicleCategoryDto).then(VehicleCategoryDto.map);
  }

  @Get()
  @Public()
  findAll(): Promise<VehicleCategoryDto[]> {
    return this.vehicleCategoriesService.findAll().then(VehicleCategoryDto.mapList);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<VehicleCategoryDto> {
    return this.vehicleCategoriesService.findOne(+id).then(VehicleCategoryDto.map);
  }

  @Put(':id')
  @Roles(Role.FleetManager)
  @ApiSecurity('jwt')
  update(@Param('id') id: string, @Body() updateVehicleCategoryDto: UpdateVehicleCategoryDto): Promise<VehicleCategoryDto> {
    return this.vehicleCategoriesService.update(+id, updateVehicleCategoryDto).then(VehicleCategoryDto.map);
  }

  @Delete(':id')
  @Roles(Role.FleetManager)
  @ApiSecurity('jwt')
  remove(@Param('id') id: string) {
    return this.vehicleCategoriesService.remove(+id);
  }
}
