import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../enums/role.enum';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user with name ${createUserDto.username}`);

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(createUserDto.password, salt);

    return this.users.save({
      username: createUserDto.username,
      password: hashed,
      role: Role.Ghost,
    });
  }

  findAll() {
    // TODO: Implement
    throw new NotImplementedException();
  }

  findOne(id: number): Promise<User> {
    return this.users.findOne(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.users.findOne({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // TODO: Implement
    throw new NotImplementedException();
  }

  remove(id: number) {
    // TODO: Implement
    throw new NotImplementedException();
  }
}
