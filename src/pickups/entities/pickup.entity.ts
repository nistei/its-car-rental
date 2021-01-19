import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Pickup extends BaseEntity {
  @ManyToOne(() => Reservation, x => x.id, { eager: true })
  reservation: Reservation;

  @ManyToOne(() => User, x => x.id, { eager: true })
  createdBy: User;
}
