import { HttpException, HttpStatus, Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { VehiclesService } from '../vehicles/vehicles.service';
import { LocationsService } from '../locations/locations.service';
import { User } from '../users/entities/user.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Role } from '../enums/role.enum';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);

  constructor(
    @InjectRepository(Reservation)
    private readonly reservations: Repository<Reservation>,
    private readonly vehicles: VehiclesService,
    private readonly locations: LocationsService,
  ) {
  }

  async create(createReservationDto: CreateReservationDto, user: User): Promise<Reservation> {
    this.logger.log('Creating new reservation');

    // Normal customers can only reserve for their user id
    if (user.role === Role.Customer && user.id !== createReservationDto.user) {
      throw new HttpException('You are not authorized to make a reservation for this person', HttpStatus.FORBIDDEN);
    }

    const vehicle = await this.vehicles.findOne(createReservationDto.vehicle);
    const pickupLocation = await this.locations.findOne(createReservationDto.pickupLocation);
    const returnLocation = await this.locations.findOne(createReservationDto.returnLocation);

    const overlaps = await this.findOverlaps(
      vehicle,
      createReservationDto.selectedPickupTime,
      createReservationDto.selectedReturnTime);

    if (overlaps.length > 0) {
      throw new HttpException('Vehicle is occupied in this range', HttpStatus.CONFLICT);
    }

    return await this.reservations.save<Reservation>({
      user,
      vehicle,
      pickupLocation,
      returnLocation,
      selectedPickupTime: createReservationDto.selectedPickupTime,
      actualPickupTime: null,
      selectedReturnTime: createReservationDto.selectedReturnTime,
      actualReturnTime: null,
    });
  }

  // TODO: Paginate
  findAll(): Promise<Reservation[]> {
    return this.reservations.find();
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservations.findOne(id);

    if (!reservation) {
      throw new HttpException(`Reservation with id ${id} not found`, 404);
    }

    return reservation;
  }

  findOverlaps(vehicle: Vehicle, start: Date, end: Date): Promise<Reservation[]> {
    return this.reservations.find({
      selectedPickupTime: LessThanOrEqual(end),
      selectedReturnTime: MoreThanOrEqual(start),
      vehicle,
    });
  }

  // TODO: Implement
  update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
