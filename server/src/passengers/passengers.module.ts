import { Module, Logger } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengersEntity } from './entities/passenger.entity';

@Module({
  controllers: [PassengersController],
  providers: [PassengersService, Logger],
  imports: [TypeOrmModule.forFeature([PassengersEntity])],
})
export class PassengersModule {}
