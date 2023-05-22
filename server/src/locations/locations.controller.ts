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
import { LocationService } from './locations.service';
import { LocationDto, LocationsParamsDto } from './dto/location.dto';
import { errorRes, successRes } from 'src/utls/response.formatter';
import _ = require('lodash');

@Controller('api/locations')
export class LocationsController {
  constructor(
    private readonly locationService: LocationService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() location: LocationDto) {
    try {
      const createdPassenger = await this.locationService.create(location);
      return successRes('location created successfully', createdPassenger);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get()
  async findAll() {
    try {
      const Locations = await this.locationService.findAll();
      if (_.isEmpty(Locations)) {
        return errorRes('Error fetching Locations');
      }
      return successRes('Locations fetched successfully', Locations);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get(':id')
  async findOne(@Param() params: LocationsParamsDto) {
    try {
      const Locations = await this.locationService.findOne(parseInt(params.id));
      if (_.isEmpty(Locations)) {
        return errorRes('Error fetching location');
      }
      return successRes('location fetched successfully', Locations);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Delete(':id')
  async remove(@Param() params: LocationsParamsDto) {
    return this.locationService.remove(parseInt(params.id));
  }
}
