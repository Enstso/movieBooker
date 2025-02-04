// dtos/UserDTO.ts

export interface Iuser {
     id?: number,
     username?: string,
     email: string,
     password?:string,
     roles?: string
}

export class UserDTO implements Iuser {
    constructor(
      public id: number,
      public username: string,
      public email: string,
      public password?: string,
      public roles?: string
    ) {}
  }
  