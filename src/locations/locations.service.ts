import { HttpException, Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocationsService {
  private readonly logger = new Logger(LocationsService.name);

  constructor(
    @InjectRepository(Location)
    private readonly locations: Repository<Location>,
    private readonly users: UsersService,
  ) {
  }

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    this.logger.log('Creating new location');

    const manager = await this.users.findOne(createLocationDto.manager);

    if (!manager) {
      throw new HttpException(`Manager with id ${createLocationDto.manager} not found`, 404);
    }

    return await this.locations.save({
      name: createLocationDto.name,
      vehicleCapacity: createLocationDto.vehicleCapacity,
      manager,
    });
  }

  // TODO: Paginate
  findAll(): Promise<Location[]> {
    return this.locations.find();
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locations.findOne(id);

    if (!location) {
      throw new HttpException(`Location with id ${id} not found`, 404);
    }

    return location;
  }

  // TODO: Implement
  update(id: number, updateLocationDto: UpdateLocationDto): Promise<Location> {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
