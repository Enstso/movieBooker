
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Iuser, IuserRegister } from 'src/users/dto/userDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,     private jwtService: JwtService
  ) {}

  async signIn(userDto:Iuser): Promise<any> {
    const user = await this.usersService.findOne(userDto.id);

    userDto.password = userDto.password as string;
    user.password = user?.password as string;

    if(userDto.password && user.password){

    }

    const validPassword =  bcrypt.compare(userDto.password,user.password)

    if(!validPassword){
      throw new UnauthorizedException;
    }
    const payload = { sub: user?.id, username: user?.username };

    return {access_token: await this.jwtService.signAsync(payload) };
  }

  async register(userDto: any): Promise<any> {
    const createUser = this.usersService.create(userDto);
  }

  
}
