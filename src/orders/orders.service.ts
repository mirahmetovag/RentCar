import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CarsService } from './../cars/cars.service';
import { CreateCarDto } from 'src/cars/dto/create-car.dto';
import { AvailabilityDto } from './dto/availability.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('order') private readonly ordersService: Model <any>,
  private readonly usersService: UsersService,
  private readonly carsService: CarsService) {}
  
  async create({carId, startDate, duration}: CreateOrderDto, user: string) {
    
    const theUser = await this.usersService.findOne(user);
    const car = await this.carsService.findOne(carId);

    const pricePerDay = car.price;
    const sum = pricePerDay*duration;

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);

    const orders = await this.ordersService.find({carId: carId});
    const filteredOrders = orders.filter(orders => (orders.endDate > endDate && orders.startDate < endDate) || (orders.endDate > startDate && orders.startDate > startDate))

    if(filteredOrders.length > 0) throw new BadRequestException('The car is not available for these days');
    
    const order = await this.ordersService.create({carId, startDate, endDate, duration, sum, userId: user})
    return {message: 'Order was added', order};
  }

  async findAll() {
    const orders = await this.ordersService.find();
    return {orders: orders};
  }

  async findAvailable({startDate, duration, budget}: AvailabilityDto, user: string) {
    const maxPerDay = budget/duration;
    const cars = await this.carsService.findAll();
    let theCars = cars.filter(car => car.price <= maxPerDay);
    if (!theCars) throw new NotFoundException('There is no car for this price');

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);

    const orders = await this.ordersService.find();
    
    for (let i = 0; i < orders.length; i++) {
      const aCar = orders[i].carId;
      const isCar = theCars.filter(car => car._id === aCar);
      if (isCar.length > 0) {
        if((orders[i].endDate > endDate && orders[i].startDate < endDate) || (orders[i].endDate > startDate && orders[i].startDate > startDate)) {
          theCars.filter(car => car._id != orders[i].carId);
        }
      }
    }

    return theCars;
  }

  async findOne(id: string) {
    const order = await this.ordersService.findById(id);
    if(!order) throw new BadRequestException('Order was not found');
    return order;
  }

  async update(id: string, {startDate, duration}: UpdateOrderDto) {
    const order = await this.ordersService.findById(id);
    if(!order) throw new BadRequestException('Order was not found');

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);

    try {
      await this.ordersService.findByIdAndUpdate(id, { $set: {startDate, endDate, duration}});
    } catch (error) {
      console.log(error);
    }
    return {message: 'Order was updated'};
  }

  async remove(id: string) {
    const order = await this.ordersService.findById(id);
    if(!order) throw new BadRequestException('Order was not found');
    try {
      await this.ordersService.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
    return {message: 'Order was canceled and deleted'};
  }
}