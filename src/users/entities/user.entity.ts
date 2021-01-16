import { Column, Entity, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/role.enum';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  @Index({ unique: true })
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
