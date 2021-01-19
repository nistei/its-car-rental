import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Return extends BaseEntity {
  @ManyToOne(() => Reservation, x => x.id, { eager: true })
  reservation: Reservation;

  @ManyToOne(() => User, x => x.id, { eager: true })
  createdBy: User;

  @Column()
  @Index()
  hadIssues: boolean;
}
