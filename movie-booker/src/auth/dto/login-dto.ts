import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address for login',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'SecurePass123!',
    description: 'User password for login',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;
}
