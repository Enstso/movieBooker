// dtos/UserDTO.ts

import { Role } from 'src/auth/roles/role.enum';

export interface Iuser {
  id?: number;
  username?: string;
  email: string;
  password?: string;
  roles?: Role[];
}

export interface IuserRegister {
  username: string;
  email: string;
  password: string;
  roles?: Role[];
}

export interface IuserLogin {
  id?
  username?: string;
  email: string;
  password: string;
  roles?: Role[];
}

