import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class VehicleCategory extends BaseEntity {
  @Column()
  @Index()
  name: string;

  @Column()
  iconUrl: string;
}
