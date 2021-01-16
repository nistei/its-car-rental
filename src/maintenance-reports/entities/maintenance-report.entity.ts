import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class MaintenanceReport extends BaseEntity {
  @ManyToOne(() => Vehicle, x => x.id)
  @ApiProperty({ description: 'The vehicle the report refers to' })
  vehicle: Vehicle;

  @ManyToOne(() => User, x => x.id)
  @ApiProperty({ description: 'The mechanic working on the maintenance' })
  mechanic: User;

  @Column()
  @ApiProperty({description: 'The detailed info about the report'})
  details: string;

  @Column()
  @ApiProperty({description: 'Whether issues were found or not'})
  hadIssues: boolean;
}
