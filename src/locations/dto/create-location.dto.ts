import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ description: 'The name of the location' })
  name: string;

  @ApiProperty({ description: 'The head of the location' })
  manager: number;

  @ApiProperty({ description: 'The number of vehicles the location can hold' })
  vehicleCapacity: number;
}
