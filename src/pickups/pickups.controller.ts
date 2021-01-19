import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { PickupsService } from './pickups.service';
import { CreatePickupDto } from './dto/create-pickup.dto';
import { UpdatePickupDto } from './dto/update-pickup.dto';
import { PickupDto } from './dto/pickup.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@ApiTags('pickups')
@Controller('api/v1/pickups')
@ApiSecurity('jwt')
export class PickupsController {
  constructor(private readonly pickupsService: PickupsService) {}

  @Post()
  @Roles(Role.CustomerService, Role.FrontOffice)
  create(@Body() createPickupDto: CreatePickupDto, @Request() req): Promise<PickupDto> {
    return this.pickupsService.create(createPickupDto, req.user).then(PickupDto.map);
  }

  @Get()
  @Roles(Role.CustomerService, Role.FrontOffice, Role.FleetManager)
  findAll(): Promise<PickupDto[]> {
    return this.pickupsService.findAll().then(PickupDto.mapList);
  }

  @Get(':id')
  @Roles(Role.CustomerService, Role.FrontOffice, Role.FleetManager)
  findOne(@Param('id') id: string): Promise<PickupDto> {
    return this.pickupsService.findOne(+id).then(PickupDto.map);
  }

  @Put(':id')
  @Roles(Role.CustomerService, Role.FrontOffice)
  update(@Param('id') id: string, @Body() updatePickupDto: UpdatePickupDto): Promise<PickupDto> {
    return this.pickupsService.update(+id, updatePickupDto).then(PickupDto.map);
  }

  @Delete(':id')
  @Roles(Role.CustomerService, Role.FrontOffice)
  remove(@Param('id') id: string) {
    return this.pickupsService.remove(+id);
  }
}
