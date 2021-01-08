import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('jwt')
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('jwt')
  async findOne(@Param('id') id: string): Promise<Partial<User>> {
    const { password, ...result } = await this.usersService.findOne(+id);
    return result;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('jwt')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    const { password, ...result } = await this.usersService.update(+id, updateUserDto);
    return result;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('jwt')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
