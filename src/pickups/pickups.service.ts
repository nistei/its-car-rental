import { HttpException, HttpStatus, Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { CreatePickupDto } from './dto/create-pickup.dto';
import { UpdatePickupDto } from './dto/update-pickup.dto';
import { User } from '../users/entities/user.entity';
import { Pickup } from './entities/pickup.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationsService } from '../reservations/reservations.service';

@Injectable()
export class PickupsService {
  private readonly logger = new Logger(PickupsService.name);

  constructor(
    @InjectRepository(Pickup)
    private readonly pickups: Repository<Pickup>,
    private readonly reservations: ReservationsService,
  ) {
  }

  async create(createPickupDto: CreatePickupDto, user: User): Promise<Pickup> {
    this.logger.log(`Creating new pickup report for reservation '${createPickupDto.reservation}'`);

    const reservation = await this.reservations.findOne(createPickupDto.reservation);
    const existingPickup = await this.pickups.findOne({ reservation: {id: createPickupDto.reservation }});

    if (existingPickup) {
      this.logger.log(`Vehicle for reservation ${createPickupDto.reservation} has already been picked up`);
      throw new HttpException(`Vehicle for reservation ${createPickupDto.reservation} has already been picked up`, HttpStatus.CONFLICT);
    }

    return await this.pickups.save<Pickup>({
      reservation,
      createdBy: user,
    });
  }

  // TODO: Paginate
  findAll(): Promise<Pickup[]> {
    return this.pickups.find();
  }

  async findOne(id: number): Promise<Pickup> {
    const pickup = await this.pickups.findOne(id);

    if (!pickup) {
      throw new HttpException(`Pickup with id ${id} not found`, 404);
    }

    return pickup;
  }

  // TODO: Implement
  update(id: number, updatePickupDto: UpdatePickupDto): Promise<Pickup> {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
