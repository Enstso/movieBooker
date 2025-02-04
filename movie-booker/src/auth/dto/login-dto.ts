import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsNotEmpty({ message: 'email is required' })
    @IsString()
    email: string;
    
    @IsNotEmpty({ message: 'oldPassword is required' })
    @IsString()
    password: string;
}