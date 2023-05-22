import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsEntity } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationsEntity)
    private readonly locationRepositoy: Repository<LocationsEntity>,
  ) {}

  async create(createLocationDto: any) {
    const location: LocationsEntity = {
      isDelete: false,
      ...createLocationDto,
    };
    this.locationRepositoy.create(location);
    const locations = await this.locationRepositoy.save(location);
    return locations;
  }

  async findAll() {
    return await this.locationRepositoy.find();
  }

  async findOne(id: number) {
    return await this.locationRepositoy.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return await this.locationRepositoy.delete({ id });
  }
}
