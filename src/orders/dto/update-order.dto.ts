import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto  {
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ description: 'rent starts date', type: 'string', example: '2023-09-23T18:25:43.511Z' })
    startDate: Date;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'days count', type: 'number', example: '5' })
    duration: number
}
