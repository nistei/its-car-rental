import { Body, Controller, Delete, Get, Param, Post, Put, Request, ValidationPipe } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiConflictResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { ReservationDto } from './dto/reservation.dto';

@ApiTags('reservations')
@Controller('api/v1/reservations')
@ApiSecurity('jwt')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @Roles(Role.Customer, Role.CustomerService, Role.FrontOffice)
  @ApiOkResponse()
  @ApiConflictResponse()
  create(@Body() createReservationDto: CreateReservationDto, @Request() req): Promise<ReservationDto> {
    return this.reservationsService.create(createReservationDto, req.user).then(ReservationDto.map);
  }

  @Get()
  @Roles(Role.Customer, Role.CustomerService, Role.FrontOffice, Role.FleetManager)
  findAll(): Promise<ReservationDto[]> {
    return this.reservationsService.findAll().then(ReservationDto.mapList);
  }

  @Get(':id')
  @Roles(Role.Customer, Role.CustomerService, Role.FrontOffice, Role.FleetManager)
  findOne(@Param('id') id: string): Promise<ReservationDto> {
    return this.reservationsService.findOne(+id).then(ReservationDto.map);
  }

  @Put(':id')
  @Roles(Role.Customer, Role.CustomerService, Role.FrontOffice)
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto): Promise<ReservationDto> {
    return this.reservationsService.update(+id, updateReservationDto).then(ReservationDto.map);
  }

  @Delete(':id')
  @Roles(Role.Customer, Role.CustomerService, Role.FrontOffice)
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
