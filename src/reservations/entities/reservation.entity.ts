import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Location } from '../../locations/entities/location.entity';

@Entity()
export class Reservation extends BaseEntity {
  @ManyToOne(() => User, x => x.id)
  @ApiProperty({ description: 'The user that made the reservation' })
  user: User;

  @ManyToOne(() => Vehicle, x => x.id)
  @ApiProperty({ description: 'The vehicle that got assigned' })
  vehicle: Vehicle;

  @ManyToOne(() => Location, x => x.id)
  @ApiProperty({ description: 'The location where the vehicle will be picked up' })
  pickupLocation: Location;

  @Column()
  @Index()
  @ApiProperty({ description: 'The, by the user, selected pickup time' })
  selectedPickupTime: Date;

  @Column()
  @Index()
  @ApiProperty({ description: 'The actual pickup time' })
  actualPickupTime: Date;

  @ManyToOne(() => Location, x => x.id)
  @ApiProperty({ description: 'The location where the vehicle will be returned' })
  returnLocation: Location;

  @Column()
  @Index()
  @ApiProperty({ description: 'The, by the user, selected return time' })
  selectedReturnTime: Date;

  @Column()
  @Index()
  @ApiProperty({ description: 'The actual return time' })
  actualReturnTime: Date;
}
