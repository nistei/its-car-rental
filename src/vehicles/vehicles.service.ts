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

    return await this.vehicles.save({
      ...createVehicleDto,
      category,
    })
  }

  // TODO: Paginate
  findAll(): Promise<Vehicle[]> {
    return this.vehicles.find();
  }

  // TODO: Implement
  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicles.findOne(id);

    if (!vehicle) {
      throw new HttpException(`Vehicle with id ${id} not found`, 404);
    }

    return vehicle;
  }

  // TODO: Implement
  update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
