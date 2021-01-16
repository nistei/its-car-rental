import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class VehicleCategory extends BaseEntity {
  @Column()
  @Index()
  @ApiProperty({ description: 'The name of the category' })
  name: string;

  @Column()
  @ApiProperty({ description: 'URL to the icon of the category' })
  iconUrl: string;
}
