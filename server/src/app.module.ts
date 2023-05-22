require('dotenv').config();
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatesModule } from './rates/rates.module';
import { dataSourceOptions } from 'db/data-source';
import { PassengersModule } from './passengers/passengers.module';
import { BookingsModule } from './bookings/bookings.module';
import { PassengerExtrasModule } from './passenger-extras/passenger-extras.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LocationsModule } from './locations/locations.module';
/**
 * Usage and Description - This file will act as the main
 * app wrapper combining the controller functions and the
 * service functions
 *
 **/
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CommandModule,
    RatesModule,
    PassengersModule,
    BookingsModule,
    PassengerExtrasModule,
    LocationsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'build'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
