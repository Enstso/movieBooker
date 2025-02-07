import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class ReservationDto {
  @ApiProperty({
    description: "L'ID du film à réserver",
    example: 12,
  })
  @IsInt()
  @Min(1, { message: 'Movie ID must be a positive integer' })
  movie_id: number;

  @ApiProperty({
    description: "La date et l'heure de la réservation (format ISO 8601)",
    example: "2025-03-15T14:30:00.000Z",
  })
  @Type(() => Date)
  @IsDate({ message: 'Reservation date must be a valid date' })
  @IsNotEmpty({ message: 'Reservation date cannot be empty' })
  reservationDate: Date;
}
