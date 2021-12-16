import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserRegisterDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  confirmPassword: string;
}
