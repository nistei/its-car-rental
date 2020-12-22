import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
      role: 'Maintenance'
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
      role: 'User',
    },
  ];

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
}
