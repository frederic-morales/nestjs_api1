import { IsString, IsEmail, IsNotEmpty, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UpdateUserDto {
  // @IsString()
  // @IsNotEmpty()
  // id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password: string;
}
