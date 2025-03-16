import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Iuser, IuserRegister , IuserLogin} from 'src/users/dto/userDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userDto: IuserLogin): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(userDto.email);
  
    const validPassword = await bcrypt.compare(userDto.password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user?.id, username: user?.username };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async register(userDto: IuserRegister): Promise<void> {
    await this.usersService.create(userDto);
  }
}
