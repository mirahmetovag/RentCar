import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { OrdersModule } from './orders/orders.module';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}), MongooseModule.forRoot(process.env.DB_URL), UsersModule, AuthModule, CarsModule, OrdersModule, FileModule, MailModule ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
