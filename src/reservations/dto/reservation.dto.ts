import { BaseDto } from '../../common/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from '../entities/reservation.entity';

export class ReservationDto extends BaseDto {
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

  public static map(reservation: Reservation): ReservationDto {
    return {
      ...reservation,
      vehicle: reservation.vehicle?.id,
      user: reservation.user?.id,
      pickupLocation: reservation.pickupLocation?.id,
      returnLocation: reservation.returnLocation?.id,
    };
  }

  public static mapList(reservations: Reservation[]): ReservationDto[] {
    return reservations.map(ReservationDto.map);
  }
}
