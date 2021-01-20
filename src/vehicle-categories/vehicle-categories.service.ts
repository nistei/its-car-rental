import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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

  async update(id: number, updateVehicleCategoryDto: UpdateVehicleCategoryDto): Promise<VehicleCategory> {
    this.logger.log(`Updating category with id ${id}`);

    await this.findOne(id);

    await this.categories.update(id, updateVehicleCategoryDto);
    return this.categories.findOne(id);
  }

  async remove(id: number) {
    this.logger.log(`Trying to remove category with id ${id}`);
    const category = await this.findOne(id);

    try {
      await this.categories.remove(category);
    } catch (e) {
      // FK Constraint
      if (e.errno === 1451) {
        this.logger.warn(`Tried to remove category with id ${id} which is still in use`);
        throw new HttpException(`Category id ${id} is still in use`, HttpStatus.BAD_REQUEST);
      } else {
        throw e;
      }
    }
  }
}
