import { Column, Entity, Index } from 'typeorm';
import { Role } from '../../enums/role.enum';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Ghost,
  })
  role: Role;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
