import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateFileDto {
    @ApiProperty({type: 'string', format: 'binary'})
    file: Express.Multer.File;
}