import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from 'src/users/users.module';
import { CarsModule } from 'src/cars/cars.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './../shared/models/Order.schema';

@Module({
  imports: [UsersModule, CarsModule, MongooseModule.forFeature([{schema: OrderSchema, name: 'order'}])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
