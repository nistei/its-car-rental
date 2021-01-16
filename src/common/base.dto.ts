import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({
    description: 'The unique identifier of the entity',
    example: '1234',
  })
  id?: number;

  @ApiProperty({ description: 'The time of creation' })
  createdAt?: Date;

  @ApiProperty({ description: 'The time of the last update' })
  updatedAt?: Date;
}
