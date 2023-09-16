import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class AvailabilityDto {
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ description: 'rent starts date', type: 'string', example: '2023-09-23T18:25:43.511Z' })
    startDate: Date;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'days count', type: 'number', example: '5' })
    duration: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'max payment', type: 'number', example: '2000000' })
    budget: number;
}
