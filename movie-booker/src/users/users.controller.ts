import {
  Controller,
  Delete,
  Request,
  UseGuards,
  Put,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdatePasswordDto } from './dto/update-dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put()
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Body() password: UpdatePasswordDto) {
    return this.userService.update(password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  @ApiOperation({ summary: 'Delete user account' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  delete(@Request() req) {
    return this.userService.delete(req.user.id);
  }
}