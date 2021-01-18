import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user', example: 'user@x.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The users password', example: 'sUpeR_SEcuRe' })
  password: string;

  @ApiProperty({ description: 'The users first name', example: 'Max' })
  firstName: string;

  @ApiProperty({ description: 'The users last name', example: 'Mustermann' })
  lastName: string;
}
