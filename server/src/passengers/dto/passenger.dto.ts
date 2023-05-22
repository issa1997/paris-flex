import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class PassengerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  passengerCount: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  travelNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  travelFrom: string;
}

export class PassengersParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
