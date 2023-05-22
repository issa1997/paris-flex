import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class RateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fromLocation: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  toLocation: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  packageName: string;

  @IsNumber()
  @IsNotEmpty()
  passengerCount: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class RatesParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class RatesFromLocationParamsDto {
  @IsString()
  @IsNotEmpty()
  toLocation: string;

  @IsString()
  @IsNotEmpty()
  fromLocation: string;

  @IsNumber()
  @IsNotEmpty()
  passengerCount: number;

  @IsNumber()
  @IsNotEmpty()
  pickUpTime: string;
}
