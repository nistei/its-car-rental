import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class MaintenanceReport extends BaseEntity {
  @ManyToOne(() => Vehicle, x => x.id, { eager: true })
  vehicle: Vehicle;

  @ManyToOne(() => User, x => x.id, { eager: true })
  mechanic: User;

  @Column()
  details: string;

  @Column()
  hadIssues: boolean;
}
