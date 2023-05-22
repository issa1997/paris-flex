import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { RatesService } from './rates.service';
import {
  RateDto,
  RatesFromLocationParamsDto,
  RatesParamsDto,
} from './dto/rate.dto';
import { errorRes, successRes } from 'src/utls/response.formatter';
import _ = require('lodash');

@Controller('api/rates')
export class RatesController {
  constructor(
    private readonly ratesService: RatesService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() rate: RateDto) {
    try {
      const createdRate = await this.ratesService.create(rate);
      return successRes('Rate created successfully', createdRate);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get()
  async findAll() {
    try {
      const rates = await this.ratesService.findAll();
      if (_.isEmpty(rates)) {
        return errorRes('Error fetching rates');
      }
      return successRes('Rates fetched successfully', rates);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get(':id')
  async findOne(@Param() params: RatesParamsDto) {
    try {
      const rates = await this.ratesService.findOne(parseInt(params.id));
      if (_.isEmpty(rates)) {
        return errorRes('Error fetching rate');
      }
      return successRes('Rate fetched successfully', rates);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Patch(':id')
  async update(@Param() params: RatesParamsDto, @Body() rate: RateDto) {
    try {
      const updatedRate = await this.ratesService.update(
        parseInt(params.id),
        rate,
      );
      return successRes('Rate updated successfully', updatedRate);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Delete(':id')
  async remove(@Param() params: RatesParamsDto) {
    return this.ratesService.remove(parseInt(params.id));
  }

  @Get('from-location/:toLocation/:fromLocaiton/:passengerCount/:pickUpTime')
  async getRatesFromLocation(@Param() params: RatesFromLocationParamsDto) {
    try {
      const rates = await this.ratesService.getRateFromLocation(params);
      if (_.isEmpty(rates)) {
        return errorRes('Error fetching rate from location');
      }
      return successRes('Rate from location fetched successfully', rates);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }
}
