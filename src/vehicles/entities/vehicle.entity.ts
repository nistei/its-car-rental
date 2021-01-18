import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { VehicleCategory } from '../../vehicle-categories/entities/vehicle-category.entity';

@Entity()
export class Vehicle extends BaseEntity {
  @Column()
  @Index()
  brand: string;

  @Column()
  model: string;

  @Column()
  @Index()
  seats: number;

  @Column()
  @Index()
  productionYear: number;

  @ManyToOne(() => VehicleCategory, x => x.id)
  category: VehicleCategory;

  @Column()
  imageUrl: string;

  @Column()
  @Index()
  pricePerDay: number;
}
