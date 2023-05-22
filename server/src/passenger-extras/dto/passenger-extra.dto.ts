import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class PassengerExtraDto {
  @IsNumber()
  @IsNotEmpty()
  passengerId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  extrasDescription: string;

  @IsNumber()
  @IsNotEmpty()
  childSeats: number;

  @IsNumber()
  @IsNotEmpty()
  boosterSeats: number;
}

export class PassengerExtrasParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
