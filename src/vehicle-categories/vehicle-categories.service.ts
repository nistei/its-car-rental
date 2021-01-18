import { HttpException, Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { CreateVehicleCategoryDto } from './dto/create-vehicle-category.dto';
import { UpdateVehicleCategoryDto } from './dto/update-vehicle-category.dto';
import { VehicleCategory } from './entities/vehicle-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleCategoriesService {
  private readonly logger = new Logger(VehicleCategoriesService.name);

  constructor(
    @InjectRepository(VehicleCategory)
    private readonly categories: Repository<VehicleCategory>,
  ) {
  }

  async create(createVehicleCategoryDto: CreateVehicleCategoryDto): Promise<VehicleCategory> {
    this.logger.log('Creating new vehicle category');

    return await this.categories.save<VehicleCategory>({
      name: createVehicleCategoryDto.name,
      iconUrl: createVehicleCategoryDto.iconUrl,
    });
  }

  // TODO: Paginate
  findAll(): Promise<VehicleCategory[]> {
    return this.categories.find();
  }

  async findOne(id: number): Promise<VehicleCategory> {
    const category = await this.categories.findOne(id);

    if (!category) {
      throw new HttpException(`Vehicle category with id ${id} not found`, 404);
    }

    return category;
  }

  // TODO: Implement
  update(id: number, updateVehicleCategoryDto: UpdateVehicleCategoryDto): Promise<VehicleCategory> {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
