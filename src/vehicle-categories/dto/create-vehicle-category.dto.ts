import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleCategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  name: string;

  @ApiProperty({ description: 'URL to the icon of the category' })
  iconUrl: string;
}
