import { Logger, Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatesEntity } from './entities/rate.entity';

@Module({
  controllers: [RatesController],
  providers: [RatesService, Logger],
  imports: [TypeOrmModule.forFeature([RatesEntity])],
})
export class RatesModule {}
