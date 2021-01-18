import { HttpException, HttpStatus, Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { VehiclesService } from '../vehicles/vehicles.service';
import { LocationsService } from '../locations/locations.service';
import { User } from '../users/entities/user.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

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

    const vehicle = await this.vehicles.findOne(createReservationDto.vehicle);
    const pickupLocation = await this.locations.findOne(createReservationDto.pickupLocation);
    const returnLocation = await this.locations.findOne(createReservationDto.returnLocation);

    if (!(await this.vehicleIsFree(
      vehicle,
      createReservationDto.selectedPickupTime,
      createReservationDto.selectedReturnTime))) {
      throw new HttpException('Vehicle is occupied in this range', HttpStatus.CONFLICT);
    }

    return await this.reservations.save({
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

  async vehicleIsFree(vehicle: Vehicle, start: Date, end: Date): Promise<boolean> {
    const overlaps = await this.reservations.find({
      selectedPickupTime: LessThan(end),
      selectedReturnTime: MoreThan(start),
      vehicle,
    });

    return overlaps.length === 0;
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
