import { HttpException, HttpStatus, Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationsService } from '../reservations/reservations.service';
import { Return } from './entities/return.entity';
import { User } from '../users/entities/user.entity';
import { Pickup } from '../pickups/entities/pickup.entity';
import { PickupsService } from '../pickups/pickups.service';

@Injectable()
export class ReturnsService {
  private readonly logger = new Logger(ReturnsService.name);

  constructor(
    @InjectRepository(Return)
    private readonly returns: Repository<Return>,
    private readonly reservations: ReservationsService,
    private readonly pickups: PickupsService,
  ) {
  }

  async create(createReturnDto: CreateReturnDto, user: User): Promise<Return> {
    this.logger.log(`Creating new return report for reservation '${createReturnDto.reservation}'`);

    const reservation = await this.reservations.findOne(createReturnDto.reservation);
    const pickup = await this.pickups.findByReservationId(reservation.id);
    if (pickup.length !== 1) {
      const e = new HttpException(`Vehicle for reservation ${createReturnDto.reservation} has not been picked up yet`, HttpStatus.BAD_REQUEST);
      this.logger.warn(e);
      throw e;
    }

    const existingReturn = await this.returns.findOne({ reservation: {id: createReturnDto.reservation }});
    if (existingReturn) {
      this.logger.warn(`Vehicle for reservation ${createReturnDto.reservation} has already been returned`);
      throw new HttpException(`Vehicle for reservation ${createReturnDto.reservation} has already been returned`, HttpStatus.CONFLICT);
    }

    return await this.returns.save<Return>({
      reservation,
      createdBy: user,
      hadIssues: createReturnDto.hadIssues,
    });
  }

  // TODO: Paginate
  findAll(): Promise<Return[]> {
    return this.returns.find();
  }

  async findOne(id: number): Promise<Return> {
    const ret = await this.returns.findOne(id);

    if (!ret) {
      throw new HttpException(`Return with id ${id} not found`, 404);
    }

    return ret;
  }

  // TODO: Implement
  update(id: number, updateReturnDto: UpdateReturnDto): Promise<Pickup> {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
