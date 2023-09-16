import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateCarDto  {
    @IsNumber()
    @IsNotEmpty()
    price: number
}