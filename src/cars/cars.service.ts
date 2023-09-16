import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Model } from 'mongoose';
import { AuthGuard } from './../shared/guards/auth.guard';

@Injectable()
export class CarsService {
constructor(@InjectModel('car') private readonly carsService: Model <any> ) {}
  async create({make, photo, year, price}: CreateCarDto) {
    const data = await this.carsService.create({make, photo, year, price});
    return {message: 'Car was added', data};
  }

  async findAll() {
    const cars = await this.carsService.find();
    if (!cars) throw new NotFoundException('There is no a single car');
    return cars;
  }

  async findOne(id: string) {
    const car = await this.carsService.findById(id);
    if (!car) throw new BadRequestException('Car was not found')
    return car;
  }

  async update(id: string, {price}: UpdateCarDto) {
    const car = await this.carsService.findById(id);
    if (!car) throw new BadRequestException('Car was not found');
    const newData = await this.carsService.findByIdAndUpdate(id, { $set: { price: price }});
    return {message: 'Car rent price was updated', newData};
  }

  async remove(id: string) {
    const car = await this.carsService.findById(id);
    if (!car) throw new BadRequestException('Car was not found');
    await this.carsService.findByIdAndDelete(id);
    return {message: 'Car was successfully deleted'};
  }
}
