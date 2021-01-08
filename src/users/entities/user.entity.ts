import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '1234',
  })
  id?: number;

  @Column()
  @Index({unique: true})
  @ApiProperty({ description: 'The username', example: 'userA' })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Ghost,
  })
  @ApiProperty({ description: 'The users role', example: 'Admin' })
  role: Role;
}
