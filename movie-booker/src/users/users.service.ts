import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { Iuser, IuserRegister, UserDTO } from './dto/userDto';
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient();

@Injectable()
export class UsersService {

  // Find a user by ID
  async findOne(id: number | undefined): Promise<UserDTO> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Create a new user
  async create(user: any): Promise<UserDTO> {
    try {
      const hashedPassword =  await bcrypt.hash(user.password,10);
      const newUser = await prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: hashedPassword,
          roles: user.roles,
        },
      });
      return newUser;
    } catch (error) {
      throw new BadRequestException(`Error creating user: ${error.message}`);
    }
  }

  // Update an existing user
  async update(id: number, userData: Partial<UserDTO>): Promise<UserDTO> {
    try {
      if (userData.password) {
        const hashedPassword  =  await bcrypt.hash(userData.password,10);
        userData.password = hashedPassword;
      }
      const updatedUser = await prisma.user.update({
        where: { id },
        data: userData,
      });
      return updatedUser;
    } catch (error) {
      throw new NotFoundException(`Error updating user with ID ${id}: ${error.message}`);
    }
  }

  // Delete a user
  async delete(id: number): Promise<{ message: string }> {
    try {
      await prisma.user.delete({ where: { id } });
      return { message: `User with ID ${id} successfully deleted.` };
    } catch (error) {
      throw new NotFoundException(`Unable to delete user with ID ${id}: ${error.message}`);
    }
  }
}
