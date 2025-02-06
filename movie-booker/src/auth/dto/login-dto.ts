import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Adresse e-mail de l’utilisateur pour la connexion',
  })
  @IsNotEmpty({ message: 'email is required' })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Mot de passe de l’utilisateur pour la connexion',
  })
  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;
}
