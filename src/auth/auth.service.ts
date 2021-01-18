import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessToken, JwtPayload } from './auth.class';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {
  }

  async validateUser(email: string, pass: string): Promise<UserDto> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      return UserDto.map(user);
    }
    return null;
  }

  login(user: User | UserDto): AccessToken {
    const payload: JwtPayload = { email: user.email, sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserDto> {
    return UserDto.map(await this.usersService.create(createUserDto));
  }
}
