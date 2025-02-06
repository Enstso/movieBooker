// dtos/UserDTO.ts

import { Role } from "src/auth/roles/role.enum";

export interface Iuser {
     id?: number,
     username?: string,
     email: string,
     password?:string,
     roles?: Role[]
}

export interface IuserRegister {
  id: number,
  username: string,
  email: string,
  password?:string,
  roles?: Role[]
}
export class UserDTO implements Iuser {
    constructor(
      public id: number,
      public username: string,
      public email: string,
      public password?: string,
      public roles?: Role[]
    ) {}
  }
  