import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ description: 'The user that made the reservation' })
  user: number;

  @ApiProperty({ description: 'The vehicle that got assigned' })
  vehicle: number;

  @ApiProperty({ description: 'The location where the vehicle will be picked up' })
  pickupLocation: number;

  @ApiProperty({ description: 'The, by the user, selected pickup time' })
  selectedPickupTime: Date;

  @ApiProperty({ description: 'The location where the vehicle will be returned' })
  returnLocation: number;

  @ApiProperty({ description: 'The, by the user, selected return time' })
  selectedReturnTime: Date;
}
