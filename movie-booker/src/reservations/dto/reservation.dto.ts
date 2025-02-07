import { IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ReservationDto {
  @IsInt()
  user_id: number;

  @IsInt()
  movie_id: number;

  @Type(() => Date)
  @IsDate()
  reservationDate: Date;
}
