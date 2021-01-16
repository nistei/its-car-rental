import { BaseDto } from '../../common/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleCategory } from '../entities/vehicle-category.entity';

export class VehicleCategoryDto extends BaseDto {
  @ApiProperty({ description: 'The name of the category' })
  name: string;

  @ApiProperty({ description: 'URL to the icon of the category' })
  iconUrl: string;

  public static map(category: VehicleCategory): VehicleCategoryDto {
    return category;
  }

  public static mapList(categories: VehicleCategory[]): VehicleCategoryDto[] {
    return categories.map(VehicleCategoryDto.map);
  }
}
