import { Controller, Post, UseInterceptors, UploadedFile, Body, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger/dist/decorators';
import { CreateFileDto } from './dto/create-file.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@ApiTags('file')
@ApiBearerAuth()
@Controller('file')
export class FileController {
  constructor() {}

  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const randomName = v4();
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File, @Body() body: CreateFileDto, @CurrentUser() user: any) {
  return { data: file.filename, message: 'File was uploaded'}
}}