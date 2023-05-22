import { Logger, Module } from '@nestjs/common';
import { LocationService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsEntity } from './entities/location.entity';

@Module({
  controllers: [LocationsController],
  providers: [LocationService, Logger],
  imports: [TypeOrmModule.forFeature([LocationsEntity])],
})
export class LocationsModule {}
