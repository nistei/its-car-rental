import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user', example: 'user@x.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The users password', example: 'sUpeR_SEcuRe' })
  password: string;
}
