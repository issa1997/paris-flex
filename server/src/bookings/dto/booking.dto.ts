import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { TripType } from '../entities/booking.entity';

export class BookingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  pickUpLocation: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  dropOffLocation: string;

  @IsNumber()
  @IsNotEmpty()
  passengerId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  pickUpDate: string;

  @IsString()
  @IsNotEmpty()
  PickUpTime: string;

  @IsNumber()
  @IsNotEmpty()
  rateId: number;

  @IsDefined()
  @IsEnum([TripType.ONE_WAY, TripType.ROUND_TRIP])
  tripType: TripType;

  @IsNumber()
  @IsNotEmpty()
  luggagePieces: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  bookingRefId: string;
}

export class BookingsParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
