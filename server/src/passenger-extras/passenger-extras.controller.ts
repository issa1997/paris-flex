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
import { PassengerExtrasService } from './passenger-extras.service';
import {
  PassengerExtraDto,
  PassengerExtrasParamsDto,
} from './dto/passenger-extra.dto';
import { errorRes, successRes } from 'src/utls/response.formatter';
import _ = require('lodash');

@Controller('api/passenger-extras')
export class PassengerExtrasController {
  constructor(
    private readonly passengersExtrasService: PassengerExtrasService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() passengerExtra: PassengerExtraDto) {
    try {
      const createdPassengerExtra = await this.passengersExtrasService.create(
        passengerExtra,
      );
      return successRes(
        'Passenger Extra created successfully',
        createdPassengerExtra,
      );
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get()
  async findAll() {
    try {
      const passengerExtras = await this.passengersExtrasService.findAll();
      if (_.isEmpty(passengerExtras)) {
        return errorRes('Error fetching passenger extras');
      }
      return successRes(
        'Passengers Extras fetched successfully',
        passengerExtras,
      );
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get(':id')
  async findOne(@Param() params: PassengerExtrasParamsDto) {
    try {
      const passengersExtra = await this.passengersExtrasService.findOne(
        parseInt(params.id),
      );
      if (_.isEmpty(passengersExtra)) {
        return errorRes('Error fetching passenger extra');
      }
      return successRes(
        'Passenger Extra fetched successfully',
        passengersExtra,
      );
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Patch(':id')
  async update(
    @Param() params: PassengerExtrasParamsDto,
    @Body() passengerExtra: PassengerExtraDto,
  ) {
    try {
      const updatedPassengerExtra = await this.passengersExtrasService.update(
        parseInt(params.id),
        passengerExtra,
      );
      return successRes(
        'Passenger Extra updated successfully',
        updatedPassengerExtra,
      );
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Delete(':id')
  async remove(@Param() params: PassengerExtrasParamsDto) {
    return this.passengersExtrasService.remove(parseInt(params.id));
  }
}
