import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleCategory } from '../../vehicle-categories/entities/vehicle-category.entity';

@Entity()
export class Vehicle extends BaseEntity {
  @Column()
  @Index()
  @ApiProperty({ description: 'The brand of the vehicle' })
  brand: string;

  @Column()
  @ApiProperty({ description: 'The model of the vehicle' })
  model: string;

  @Column()
  @Index()
  @ApiProperty({ description: 'Number of seats of the vehicle' })
  seats: number;

  @Column()
  @Index()
  @ApiProperty({ description: 'The year the vehicle got produced' })
  productionYear: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => VehicleCategory, x => x.id)
  @ApiProperty({ description: 'The category of the vehicle' })
  category: VehicleCategory;

  @Column()
  @ApiProperty({description: 'URL to an image of the vehicle'})
  imageUrl: string;
}
