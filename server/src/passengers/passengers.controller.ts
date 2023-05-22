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
import { PassengersService } from './passengers.service';
import { PassengerDto, PassengersParamsDto } from './dto/passenger.dto';
import { errorRes, successRes } from 'src/utls/response.formatter';
import _ = require('lodash');

@Controller('api/passengers')
export class PassengersController {
  constructor(
    private readonly passengersService: PassengersService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() passenger: PassengerDto) {
    try {
      const createdPassenger = await this.passengersService.create(passenger);
      return successRes('Passenger created successfully', createdPassenger);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get()
  async findAll() {
    try {
      const passengers = await this.passengersService.findAll();
      if (_.isEmpty(passengers)) {
        return errorRes('Error fetching passengers');
      }
      return successRes('Passengers fetched successfully', passengers);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get(':id')
  async findOne(@Param() params: PassengersParamsDto) {
    try {
      const passengers = await this.passengersService.findOne(
        parseInt(params.id),
      );
      if (_.isEmpty(passengers)) {
        return errorRes('Error fetching passenger');
      }
      return successRes('Passenger fetched successfully', passengers);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Patch(':id')
  async update(
    @Param() params: PassengersParamsDto,
    @Body() passenger: PassengerDto,
  ) {
    try {
      const updatedPassenger = await this.passengersService.update(
        parseInt(params.id),
        passenger,
      );
      return successRes('Passenger updated successfully', updatedPassenger);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Delete(':id')
  async remove(@Param() params: PassengersParamsDto) {
    return this.passengersService.remove(parseInt(params.id));
  }
}
