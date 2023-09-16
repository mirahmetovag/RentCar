import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'make', type: 'string', example: 'bmw' })
    make: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'photo name', type: 'string', example: 'jgvhgjbkndjks.jpg' })
    photo: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'car year', type: 'number', example: '2020' })
    year: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'rent price per day', type: 'number', example: '200000' })
    price: number
}