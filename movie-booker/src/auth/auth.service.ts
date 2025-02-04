
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Iuser } from 'src/users/dto/userDto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(userDto:Iuser): Promise<any> {
    const user = await this.usersService.findOne(userDto.username);
    if (user?.password !== userDto.password) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  async register(user: Iuser): Promise<any> {
    
  }
}
