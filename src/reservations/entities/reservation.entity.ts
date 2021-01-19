import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Location } from '../../locations/entities/location.entity';

@Entity()
export class Reservation extends BaseEntity {
  @ManyToOne(() => User, x => x.id)
  user: User;

  @ManyToOne(() => Vehicle, x => x.id)
  vehicle: Vehicle;

  @ManyToOne(() => Location, x => x.id)
  pickupLocation: Location;

  @Column()
  @Index()
  selectedPickupTime: Date;

  @ManyToOne(() => Location, x => x.id)
  returnLocation: Location;

  @Column()
  @Index()
  selectedReturnTime: Date;
}
