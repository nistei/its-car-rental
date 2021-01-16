import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { LocationDto } from './dto/loaction.dto';

@ApiTags('locations')
@Controller('api/v1/locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiSecurity('jwt')
  async create(@Body() createLocationDto: CreateLocationDto): Promise<LocationDto> {
   return this.locationsService.create(createLocationDto).then(LocationDto.map);
  }

  @Get()
  @Public()
  findAll(): Promise<LocationDto[]> {
    return this.locationsService.findAll().then(LocationDto.mapList);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<LocationDto> {
    return this.locationsService.findOne(+id).then(LocationDto.map);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiSecurity('jwt')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto): Promise<LocationDto> {
    return this.locationsService.update(+id, updateLocationDto).then(LocationDto.map);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiSecurity('jwt')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
