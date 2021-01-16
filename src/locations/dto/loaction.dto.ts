import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../common/base.dto';
import { Location } from '../entities/location.entity';

export class LocationDto extends BaseDto {
  @ApiProperty({ description: 'The name of the location' })
  name: string;

  @ApiProperty({ description: 'The head of the location' })
  manager: number;

  @ApiProperty({ description: 'The number of vehicles the location can hold' })
  vehicleCapacity: number;

  public static map(location: Location): LocationDto {
    return {
      ...location,
      manager: location.manager?.id,
    };
  }

  public static mapList(locations: Location[]): LocationDto[] {
    return locations.map(LocationDto.map);
  }
}
