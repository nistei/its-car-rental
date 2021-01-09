import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateVehicleCategoryDto } from './dto/create-vehicle-category.dto';
import { UpdateVehicleCategoryDto } from './dto/update-vehicle-category.dto';

@Injectable()
export class VehicleCategoriesService {
  // TODO: Implement
  create(createVehicleCategoryDto: CreateVehicleCategoryDto) {
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
  update(id: number, updateVehicleCategoryDto: UpdateVehicleCategoryDto) {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
