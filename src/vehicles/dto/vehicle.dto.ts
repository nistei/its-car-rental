import { BaseDto } from '../../common/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from '../entities/vehicle.entity';

export class VehicleDto extends BaseDto {
  @ApiProperty({ description: 'The brand of the vehicle' })
  brand: string;

  @ApiProperty({ description: 'The model of the vehicle' })
  model: string;

  @ApiProperty({ description: 'Number of seats of the vehicle' })
  seats: number;

  @ApiProperty({ description: 'The year the vehicle got produced' })
  productionYear: number;

  @ApiProperty({ description: 'The category of the vehicle' })
  category: number;

  @ApiProperty({description: 'URL to an image of the vehicle'})
  imageUrl: string;

  public static map(vehicle: Vehicle): VehicleDto {
    return {
      ...vehicle,
      category: vehicle.category?.id,
    };
  }

  public static mapList(vehicles: Vehicle[]): VehicleDto[] {
    return vehicles.map(VehicleDto.map);
  }
}
