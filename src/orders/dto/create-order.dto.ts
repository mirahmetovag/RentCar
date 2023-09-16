import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'car id by database', type: 'string', example: '65061669b0bf882ef7e13d20' })
    carId: string;

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ description: 'rent starts date', type: 'string', example: '2023-09-23T18:25:43.511Z' })
    startDate: Date;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'days count', type: 'number', example: '5' })
    duration: number
}
