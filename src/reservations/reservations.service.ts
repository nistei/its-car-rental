import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  // TODO: Implement
  create(createReservationDto: CreateReservationDto) {
    throw new NotImplementedException();
  }

  // TODO: Implement
  findAll() {
    throw new NotImplementedException();
  }

  // TODO: Implement
  findOne(id: number) {
    throw new NotImplementedException();
  }

  // TODO: Implement
  update(id: number, updateReservationDto: UpdateReservationDto) {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
