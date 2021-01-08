import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AccessToken, LoginDto } from './auth.class';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { Public } from '../decorators/public.decorator';

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
  @ApiOkResponse({ description: 'The created user account', type: User })
  create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.authService.register(createUserDto);
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
  getProfile(@Request() req): Partial<User> {
    const { password, ...result } = req.user;
    return result;
  }
}
