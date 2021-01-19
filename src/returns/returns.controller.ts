import { Controller, Get, Post, Body, Put, Param, Delete, Request } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { ReturnDto } from './dto/return.dto';

@ApiTags('returns')
@Controller('api/v1/returns')
@ApiSecurity('jwt')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Post()
  @Roles(Role.CustomerService, Role.FrontOffice)
  create(@Body() createReturnDto: CreateReturnDto, @Request() req): Promise<ReturnDto> {
    return this.returnsService.create(createReturnDto, req.user).then(ReturnDto.map);
  }

  @Get()
  @Roles(Role.CustomerService, Role.FrontOffice, Role.FleetManager)
  findAll(): Promise<ReturnDto[]> {
    return this.returnsService.findAll().then(ReturnDto.mapList);
  }

  @Get(':id')
  @Roles(Role.CustomerService, Role.FrontOffice, Role.FleetManager)
  findOne(@Param('id') id: string): Promise<ReturnDto> {
    return this.returnsService.findOne(+id).then(ReturnDto.map);
  }

  @Put(':id')
  @Roles(Role.CustomerService, Role.FrontOffice)
  update(@Param('id') id: string, @Body() updateReturnDto: UpdateReturnDto): Promise<ReturnDto> {
    return this.returnsService.update(+id, updateReturnDto).then(ReturnDto.map);
  }

  @Delete(':id')
  @Roles(Role.CustomerService, Role.FrontOffice)
  remove(@Param('id') id: string) {
    return this.returnsService.remove(+id);
  }
}
