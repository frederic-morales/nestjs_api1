import { IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";

export class CreateProfileDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  @IsUrl() 
  avatar: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile: UpdateProfileDto
}