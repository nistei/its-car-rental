import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Location extends BaseEntity {
  @Column()
  @Index()
  @ApiProperty({description: 'The name of the location'})
  name: string;

  @ManyToOne(() => User, x => x.id)
  @ApiProperty({ description: 'The head of the location' })
  manager: User;

  @Column()
  @Index()
  @ApiProperty({ description: 'The number of vehicles the location can hold' })
  vehicleCapacity: number;
}
