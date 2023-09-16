import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class VerifyAuthDto {
    @ApiProperty({ description: 'username', type: 'string', example: 'eshmat07' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'otp', type: 'number', example: '00001111' })
    @IsNumber()
    @IsNotEmpty()
    otp: number;

}