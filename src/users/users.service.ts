import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly usersService: Model <any>) {}
  async create({username, password, role}: CreateUserDto) {
    const user = await this.usersService.create({username, password, role});
    return user;
  }

  async findOne(id: string) {
    const user = await this.usersService.findById(id);
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.usersService.findOne({username});
    return user;
  }
}
