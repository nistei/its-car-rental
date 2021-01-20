import { Body, Controller, Delete, Get, Param, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../common/pagination.dto';
import { Paginated } from '../common/paginated.class';
import { UserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('api/v1/users')
@ApiSecurity('jwt')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @Roles(Role.Admin)
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
  findPaginated(@Query() pagination: PaginationDto): Promise<Paginated<UserDto>> {
    return this.usersService.findPaginated(pagination).then(paginated => {
      return {
        ...paginated,
        results: UserDto.mapList(paginated.results),
      }
    });
  }

  @Get('_count')
  @Roles(Role.Admin)
  count(): Promise<number> {
    return this.usersService.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(+id).then(UserDto.map);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return this.usersService.update(+id, updateUserDto).then(UserDto.map);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
