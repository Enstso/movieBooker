
import { Body, Controller, Get, Post, HttpCode, HttpStatus, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';
import { AuthGuard } from './auth.guard';
import { Public } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() user: LoginDto) {
    return this.authService.signIn(user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() newUser: RegisterDto) {
    return this.authService.register(newUser);
  }

  @Public()
  @Get('test')
  findAll() {
    return [];
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
