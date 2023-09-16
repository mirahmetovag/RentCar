import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength, IsAlphanumeric } from "class-validator";

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @IsAlphanumeric()
  @ApiProperty({ description: 'username', type: 'string', example: 'eshmat07' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'password', type: 'string', example: '0000' })
  password: string;
}