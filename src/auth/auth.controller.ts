import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBody, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AccessToken, LoginDto } from './auth.class';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({
    description: 'The login details',
    type: LoginDto,
  })
  @ApiOkResponse({description: 'The access token for the user', type: AccessToken })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('jwt')
  @Get('/_me')
  getProfile(@Request() req) {
    return req.user;
  }
}
