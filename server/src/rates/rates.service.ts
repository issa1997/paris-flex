import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatesEntity } from './entities/rate.entity';
import { Repository } from 'typeorm';
import { RatesFromLocationParamsDto } from './dto/rate.dto';
import * as moment from 'moment';
require('dotenv').config();
import _ = require('lodash');

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(RatesEntity)
    private ratesRepository: Repository<RatesEntity>,
  ) {}

  async create(createRateDto: any) {
    const rate: RatesEntity = {
      isDelete: false,
      ...createRateDto,
    };
    const rates = this.ratesRepository.create(rate);
    await this.ratesRepository.save(rate);
    return rates;
  }

  async findAll() {
    return await this.ratesRepository.find();
  }

  async findOne(id: number) {
    return await this.ratesRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateRateDto: any) {
    const rate: RatesEntity = {
      isDelete: false,
      ...updateRateDto,
    };
    return await this.ratesRepository.update({ id }, rate);
  }

  // have to make a soft delete
  async remove(id: number) {
    return await this.ratesRepository.delete({ id });
  }

  async getRateFromLocation(locationParams: RatesFromLocationParamsDto) {
    const rateValues = await this.ratesRepository.find({
      where: {
        fromLocation: locationParams.fromLocation,
        toLocation: locationParams.toLocation,
        passengerCount: locationParams.passengerCount,
      },
    });
    const now = moment(locationParams.pickUpTime); // Get the current time
    const toTime = moment(process.env.RATE_TO_TIME, 'hh:mm:ss a'); // Set the start time to 11pm
    const fromTime = moment(process.env.RATE_FROM_TIME, 'hh:mm:ss a').add(
      1,
      'day',
    );
    if (!_.isEmpty(rateValues) && _.has(rateValues[0], 'price')) {
      if (now.isAfter(toTime) && now.isBefore(fromTime)) {
        const calculatedRates = {
          ...rateValues[0],
          price: rateValues[0].price + 15,
        };
        return calculatedRates;
      } else {
        return rateValues[0];
      }
    }
  }
}
