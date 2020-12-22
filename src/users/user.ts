import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '1234',
  })
  id?: number;

  @Column()
  @Index()
  @ApiProperty({description: 'The username', example: 'userA'})
  username: string;

  @Column()
  password: string;

  @Column()
  @Index()
  role: string;
}
