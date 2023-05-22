import { Logger, Module } from '@nestjs/common';
import { PassengerExtrasService } from './passenger-extras.service';
import { PassengerExtrasController } from './passenger-extras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerExtrasEntity } from './entities/passenger-extra.entity';

@Module({
  controllers: [PassengerExtrasController],
  providers: [PassengerExtrasService, Logger],
  imports: [TypeOrmModule.forFeature([PassengerExtrasEntity])],
})
export class PassengerExtrasModule {}
