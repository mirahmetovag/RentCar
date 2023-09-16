import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from 'src/shared/models/Car.schema';

@Module({
  imports: [MongooseModule.forFeature([{schema: CarSchema, name: 'car'}])],  
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService]
})
export class CarsModule {}
