import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get()
  async googleSignIn() {}

  @UseGuards(AuthGuard('google'))
  @Get('/in')
  async googleCallback(@Req() req) {
    return this.authService.googleCallback(req);
  }
}
