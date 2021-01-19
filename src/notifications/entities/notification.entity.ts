import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class Notification extends BaseEntity {
  @ManyToOne(() => User, x => x.id, { eager: true })
  recipient: User;

  @Column()
  topic: string;

  @Column()
  content: string;
}
