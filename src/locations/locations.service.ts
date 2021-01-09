import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  // TODO: Implement
  create(createLocationDto: CreateLocationDto) {
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
  update(id: number, updateLocationDto: UpdateLocationDto) {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
