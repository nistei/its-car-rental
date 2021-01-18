import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  email: string;
  sub: number;
  role: string;
}

export class LoginDto {
  @ApiProperty({ description: 'The email', example: 'userA' })
  email: string;

  @ApiProperty({ description: 'The users password', example: 'sUpeR_SEcuRe' })
  password: string;
}

export class AccessToken {
  @ApiProperty()
  accessToken: string;
}
