import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto{
    @IsNotEmpty({ message: 'username is required' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'email is required' })
    @IsEmail()
    email: string;  
    
    @IsNotEmpty({ message: 'password is required' })
    @IsString()
    password: string;
}