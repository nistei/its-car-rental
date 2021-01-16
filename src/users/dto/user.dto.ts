import { BaseDto } from '../../common/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/role.enum';
import { User } from '../entities/user.entity';

export class UserDto extends BaseDto {
  @ApiProperty({ description: 'The username', example: 'userA' })
  username: string;

  @ApiProperty({ description: 'The users role', example: 'Admin' })
  role: Role;

  public static map(user: User): UserDto {
    const u = {
      ...user,
    };

    u.password = undefined;

    return u;
  }

  public static mapList(users: User[]): UserDto[] {
    return users.map(UserDto.map);
  }
}
