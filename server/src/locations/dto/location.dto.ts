import { IsNotEmpty, IsString } from 'class-validator';

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  pickUpLocation: string;

  @IsString()
  @IsNotEmpty()
  dropOffLocation: string;
}

export class LocationsParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
