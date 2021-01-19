import { BaseDto } from '../../common/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Pickup } from '../entities/pickup.entity';

export class PickupDto extends BaseDto {
  @ApiProperty({ description: 'The reservation this refers to' })
  reservation: number;

  @ApiProperty({ description: 'The employee who triggered the pickup' })
  createdBy: number;

  public static map(pickup: Pickup): PickupDto {
    return {
      ...pickup,
      reservation: pickup.reservation?.id,
      createdBy: pickup.createdBy?.id,
    };
  }

  public static mapList(pickups: Pickup[]): PickupDto[] {
    return pickups.map(PickupDto.map);
  }
}
