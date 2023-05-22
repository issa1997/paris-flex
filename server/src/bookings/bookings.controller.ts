import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Logger,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingDto, BookingsParamsDto } from './dto/booking.dto';
import { errorRes, successRes } from 'src/utls/response.formatter';
import _ = require('lodash');

@Controller('api/bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() booking: BookingDto) {
    try {
      const createdBooking = await this.bookingsService.create(booking);
      return successRes('Booking created successfully', createdBooking);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get()
  async findAll() {
    try {
      const rates = await this.bookingsService.findAll();
      if (_.isEmpty(rates)) {
        return errorRes('Error fetching rates');
      }
      return successRes('Bookings fetched successfully', rates);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get('get/:id')
  async findOne(@Param() params: BookingsParamsDto) {
    try {
      const rates = await this.bookingsService.findOne(parseInt(params.id));
      if (_.isEmpty(rates)) {
        return errorRes('Error fetching booking');
      }
      return successRes('Booking fetched successfully', rates);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Patch(':id')
  async update(
    @Param() params: BookingsParamsDto,
    @Body() booking: BookingDto,
  ) {
    try {
      const updatedBooking = await this.bookingsService.update(
        parseInt(params.id),
        booking,
      );
      return successRes('Booking updated successfully', updatedBooking);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Delete(':id')
  async remove(@Param() params: BookingsParamsDto) {
    return this.bookingsService.remove(parseInt(params.id));
  }

  @Get('get-bookings-and-passengers')
  async getBookingsAndPassengers() {
    try {
      const passengersAndBookings =
        await this.bookingsService.getBookingsAndPassengers();
      return successRes(
        'Bookings and Passengers fetched successfully',
        passengersAndBookings,
      );
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }
}
