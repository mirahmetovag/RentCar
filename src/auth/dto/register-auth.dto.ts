import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength, IsAlphanumeric } from "class-validator";

export class RegisterAuthDto {
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

    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    @ApiProperty({ description: 'email', type: 'string', example: 'eshmat@gmail.com' })
    email: string;
}