import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../enums/role.enum';
import { PaginationDto } from '../common/pagination.dto';
import { Paginated } from '../common/paginated.class';

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

    // TODO: Catch and return well formed error (ER_DUP_ENTRY)
    return this.users.save({
      username: createUserDto.username,
      password: hashed,
      role: Role.Ghost,
    });
  }

  count(): Promise<number> {
    return this.users.count();
  }

  async findPaginated(pagination: PaginationDto): Promise<Paginated<Partial<User>>> {
    this.logger.log(`Trying to fetch ${pagination.take} users, starting at ${pagination.next}`);

    const [results, total] = await this.users
      .createQueryBuilder()
      .select()
      .take(pagination.take + 1)
      .where(`id >= ${pagination.next}`)
      .orderBy('id', 'ASC')
      .getManyAndCount();

    const nextCursor = results.length === pagination.take + 1 ? results[results.length - 1].id : null;

    if (nextCursor) {
      results.pop();
    }

    results.map(res => res.password = undefined);

    return {
      results,
      total,
      count: results.length,
      next: nextCursor,
    }
  }

  findOne(id: number): Promise<User> {
    return this.users.findOne(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.users.findOne({ username });
  }

  // TODO: Implement
  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    throw new NotImplementedException();
  }

  // TODO: Implement
  remove(id: number) {
    throw new NotImplementedException();
  }
}
