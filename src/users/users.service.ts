import { HttpException, HttpStatus, Injectable, Logger, NotImplementedException } from '@nestjs/common';
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
    this.logger.log(`Creating user with email ${createUserDto.email}`);

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(createUserDto.password, salt);

    try {
      return await this.users.save<User>({
        email: createUserDto.email,
        password: hashed,
        role: Role.Ghost,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName
      });
    } catch (e) {
      // Duplicate
      if (e.errno === 1062) {
        this.logger.warn(`User with email ${createUserDto.email} already exists`);
        throw new HttpException(`User with email ${createUserDto.email} already exists`, HttpStatus.CONFLICT);
      } else {
        throw e;
      }
    }
  }

  count(): Promise<number> {
    return this.users.count();
  }

  async findPaginated(pagination: PaginationDto): Promise<Paginated<User>> {
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

  findOneByEmail(email: string): Promise<User> {
    return this.users.findOne({ email });
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
