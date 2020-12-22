import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  username: string;
  sub: number;
  role: string;
}

export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class AccessToken {
  @ApiProperty()
  accessToken: string;
}
