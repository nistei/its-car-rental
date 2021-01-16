import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Location extends BaseEntity {
  @Column()
  @Index()
  name: string;

  @ManyToOne(() => User, x => x.id, { eager: true })
  manager: User;

  @Column()
  @Index()
  vehicleCapacity: number;
}
