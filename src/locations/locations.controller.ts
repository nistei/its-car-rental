import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@ApiTags('locations')
@Controller('api/v1/locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiSecurity('jwt')
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiSecurity('jwt')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiSecurity('jwt')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
