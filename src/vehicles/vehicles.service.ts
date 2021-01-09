import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  // TODO: Implement
  create(createVehicleDto: CreateVehicleDto) {
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
  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
