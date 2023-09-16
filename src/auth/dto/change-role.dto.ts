import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength, IsAlphanumeric } from "class-validator";

export class ChangeRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @IsAlphanumeric()
  @ApiProperty({ description: 'username', type: 'string', example: 'eshmat07' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'role', type: 'string', example: 'Admin' })
  role: string;
}