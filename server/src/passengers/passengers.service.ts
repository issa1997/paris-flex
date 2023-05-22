import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengersEntity } from './entities/passenger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(PassengersEntity)
    private readonly passengerRepositoy: Repository<PassengersEntity>,
  ) {}

  async create(createPassengerDto: any) {
    const Passenger: PassengersEntity = {
      isDelete: false,
      ...createPassengerDto,
    };
    this.passengerRepositoy.create(Passenger);
    const passengers = await this.passengerRepositoy.save(Passenger);
    return passengers;
  }

  async findAll() {
    return await this.passengerRepositoy.find();
  }

  async findOne(id: number) {
    return await this.passengerRepositoy.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePassengerDto: any) {
    const Passenger: PassengersEntity = {
      isDelete: false,
      ...updatePassengerDto,
    };
    return await this.passengerRepositoy.update({ id }, Passenger);
  }

  async remove(id: number) {
    return await this.passengerRepositoy.delete({ id });
  }
}
