import { Body, Controller, Delete, Get, Param, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../common/pagination.dto';
import { Paginated } from '../common/paginated.class';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @Roles(Role.Admin)
  @ApiSecurity('jwt')
  @ApiQuery({
    name: 'take',
    type: Number,
    required: false,
    description: 'The number of connections to take',
    schema: { maximum: 25, minimum: 0, default: 25 }
  })
  @ApiQuery({
    name: 'next',
    type: Number,
    required: false,
    description: 'The next id to take',
    schema: { minimum: 0, default: 0 }
  })
  findPaginated(@Query(new ValidationPipe({ transform: true })) pagination: PaginationDto): Promise<Paginated<Partial<User>>> {
    return this.usersService.findPaginated(pagination);
  }

  @Get(':id')
  @ApiSecurity('jwt')
  async findOne(@Param('id') id: string): Promise<Partial<User>> {
    const { password, ...result } = await this.usersService.findOne(+id);
    return result;
  }

  @Put(':id')
  @ApiSecurity('jwt')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    const { password, ...result } = await this.usersService.update(+id, updateUserDto);
    return result;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiSecurity('jwt')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
