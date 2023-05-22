import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassengerExtrasEntity } from './entities/passenger-extra.entity';

@Injectable()
export class PassengerExtrasService {
  constructor(
    @InjectRepository(PassengerExtrasEntity)
    private readonly passengerExtrasRepositoy: Repository<PassengerExtrasEntity>,
  ) {}

  async create(createPassengerDto: any) {
    const PassengerExtras: PassengerExtrasEntity = {
      isDelete: false,
      ...createPassengerDto,
    };
    const passengersExtras =
      this.passengerExtrasRepositoy.create(PassengerExtras);
    await this.passengerExtrasRepositoy.save(PassengerExtras);
    return passengersExtras;
  }

  async findAll() {
    return await this.passengerExtrasRepositoy.find();
  }

  async findOne(id: number) {
    return await this.passengerExtrasRepositoy.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePassengerDto: any) {
    const passengerExtras: PassengerExtrasEntity = {
      isDelete: false,
      ...updatePassengerDto,
    };
    return await this.passengerExtrasRepositoy.update({ id }, passengerExtras);
  }

  async remove(id: number) {
    return await this.passengerExtrasRepositoy.delete({ id });
  }
}
