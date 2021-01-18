import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  username: string;
  sub: number;
  role: string;
}

export class LoginDto {
  @ApiProperty({ description: 'The username', example: 'userA' })
  username: string;

  @ApiProperty({ description: 'The users password', example: 'sUpeR_SEcuRe' })
  password: string;
}

export class AccessToken {
  @ApiProperty()
  accessToken: string;
}
