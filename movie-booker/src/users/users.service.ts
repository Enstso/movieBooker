import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Iuser, IuserLogin, IuserRegister } from './dto/userDto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async findByEmail(email: string): Promise<IuserLogin> {
    try {
      const user = await prisma.user.findUniqueOrThrow({ where: { email } });
      return user;
    } catch (error) {
      throw new NotFoundException('Verify your credentials.');
    }
  }

  async findById(id: number): Promise<IuserLogin> {
    try {
      const user = await prisma.user.findUniqueOrThrow({ where: { id } });
      return user;
    } catch (error) {
      throw new NotFoundException('Verify your credentials.');
    }
  }

  // Create a new user
  async create(user: IuserRegister): Promise<void> {
    try {
      const { username, email, password, roles } = user;
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
          roles: roles,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error server user yet existing');
    }
  }

  // Update an existing user
  async update(userData: Partial<IuserLogin>, idUser: number): Promise<Iuser> {
    try {
      const {password } = userData;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        userData.password = hashedPassword;
      }
      console.log("idd",idUser);
      const updatedUser = await prisma.user.update({
        where: { id: idUser },
        data: userData,
      });
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('Error updating user');
    }
  }

  // Delete a user
  async delete(id: number): Promise<{ message: string }> {
    try {
      if (!id) {
        throw new BadRequestException('Error specify the Id');
      }
      await prisma.user.delete({ where: { id } });
      return { message: 'User successfully deleted.' };
    } catch (error) {
      throw new NotFoundException('Unable to delete user');
    }
  }
}
