import { Controller, Post, UseGuards, Request, Get, Body, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AccessToken, LoginDto } from './auth.class';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from '../decorators/public.decorator';
import { UserDto } from '../users/dto/user.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/register')
  @Public()
  @ApiBody({
    description: 'The register details',
    type: CreateUserDto,
  })
  @ApiOkResponse({ description: 'The access token for the user', type: RegisterResponseDto })
  async create(@Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto): Promise<RegisterResponseDto> {
    const user = await this.authService.register(createUserDto);

    return {
      token: this.authService.login(user),
      user
    };
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  @ApiBody({
    description: 'The login details',
    type: LoginDto,
  })
  @ApiOkResponse({ description: 'The access token for the user', type: AccessToken })
  login(@Request() req): AccessToken {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('jwt')
  @Get('/_me')
  getProfile(@Request() req): UserDto {
    return UserDto.map(req.user);
  }
}
