import { ApiProperty } from '@nestjs/swagger';

export class CreatePickupDto {
  @ApiProperty({ description: 'The reservation this refers to' })
  reservation: number;
}
