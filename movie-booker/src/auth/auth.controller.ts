import { Body, Controller, Get, Post, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';
import { AuthGuard } from './auth.guard';
import { Public } from './constants';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentication') // Groups the endpoints under the "Authentication" category
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Successful login.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() user: LoginDto) {
    return this.authService.signIn(user);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() newUser: RegisterDto) {
    return this.authService.register(newUser);
  }

  @ApiOperation({ summary: 'Public test endpoint' })
  @ApiResponse({ status: 200, description: 'Returns an empty array.' })
  @Public()
  @Get('test')
  findAll() {
    return [];
  }

  @ApiBearerAuth() // Indicates that this endpoint requires a Bearer token (JWT)
  @ApiOperation({ summary: 'Retrieve the profile of the logged-in user' })
  @ApiResponse({ status: 200, description: 'User profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
