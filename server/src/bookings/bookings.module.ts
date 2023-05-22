import { Logger, Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsEntity } from './entities/booking.entity';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, Logger],
  imports: [TypeOrmModule.forFeature([BookingsEntity])],
})
export class BookingsModule {}
