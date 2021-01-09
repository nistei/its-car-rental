import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The unique identifier of the entity',
    example: '1234',
  })
  id?: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'The time of creation' })
  createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'The time of the last update' })
  updatedAt?: Date;
}
