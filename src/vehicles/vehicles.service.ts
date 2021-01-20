import { HttpException, Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleCategoriesService } from '../vehicle-categories/vehicle-categories.service';

@Injectable()
export class VehiclesService {
  private readonly logger = new Logger(VehiclesService.name);

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicles: Repository<Vehicle>,
    private readonly categories: VehicleCategoriesService,
  ) {
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    this.logger.log('Creating new vehicle');

    const category = await this.categories.findOne(createVehicleDto.category);

    return await this.vehicles.save<Vehicle>({
      ...createVehicleDto,
      category,
    })
  }

  // TODO: Paginate
  findAll(): Promise<Vehicle[]> {
    return this.vehicles.find();
  }

  // TODO: Paginate
  findAllByCategoryId(categoryId: number): Promise<Vehicle[]> {
    return this.vehicles.find({ category: { id: categoryId }});
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicles.findOne(id);

    if (!vehicle) {
      throw new HttpException(`Vehicle with id ${id} not found`, 404);
    }

    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    this.logger.log(`Updating vehicle with id ${id}`);

    await this.findOne(id);

    const update: any = {
      ...updateVehicleDto
    };

    if (updateVehicleDto.category) {
      update.category = await this.categories.findOne(updateVehicleDto.category);
    }

    await this.vehicles.update(id, update);
    return this.vehicles.findOne(id);
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
