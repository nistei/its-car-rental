import { UserDto } from '../../users/dto/user.dto';
import { AccessToken } from '../auth.class';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({ description: 'The created user account', type: UserDto })
  user: UserDto;

  @ApiProperty({ description: 'The access token for the user', type: AccessToken })
  token: AccessToken;
}
