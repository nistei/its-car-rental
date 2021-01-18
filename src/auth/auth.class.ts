import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  email: string;
  sub: number;
  role: string;
}

export class LoginDto {
  @ApiProperty({ description: 'The email of the user', example: 'user@x.com' })
  email: string;

  @ApiProperty({ description: 'The users password', example: 'sUpeR_SEcuRe' })
  password: string;
}

export class AccessToken {
  @ApiProperty()
  accessToken: string;
}
