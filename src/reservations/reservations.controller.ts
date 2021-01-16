import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@ApiTags('reservations')
@Controller('api/v1/reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @Roles(Role.Customer, Role.CustomerService, Role.FrontOffice)
  @ApiSecurity('jwt')
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  @Roles(Role.Customer, Role.CustomerService, Role.FrontOffice, Role.FleetManager)
  @ApiSecurity('jwt')
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Customer, Role.CustomerService, Role.FrontOffice, Role.FleetManager)
  @ApiSecurity('jwt')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.Customer, Role.CustomerService, Role.FrontOffice)
  @ApiSecurity('jwt')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  @Roles(Role.Customer, Role.CustomerService, Role.FrontOffice)
  @ApiSecurity('jwt')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
