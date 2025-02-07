import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { ReservationDto } from './dto/reservation.dto';

const prisma = new PrismaClient();


@Injectable()
export class ReservationsService {
  private readonly MOVIE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  async createReservation(dto: ReservationDto) {
    const { user_id, movie_id, reservationDate } = dto;

    const reservationStart = new Date(reservationDate);
    const reservationEnd = new Date(reservationStart.getTime() + this.MOVIE_DURATION);

    // Check for overlapping reservations
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        user_id,
        OR: [
          { reservationDate: { gte: reservationStart, lt: reservationEnd } },
          { reservationDate: { lt: reservationStart, gte: reservationEnd } }
        ]
      }
    });

    if (existingReservation) {
      throw new BadRequestException('You already have a reservation during this time slot.');
    }

    return prisma.reservation.create({
      data: { user_id, movie_id, reservationDate: reservationStart },
    });
  }

  async getUserReservations(user_id: number) {
    return prisma.reservation.findMany({
      where: { user_id },
      orderBy: { reservationDate: 'asc' },
    });
  }

  async cancelReservation(id: number) {
    const reservation = await prisma.reservation.findUnique({ where: { id } });

    if (!reservation) {
      throw new NotFoundException('Reservation not found.');
    }

    return prisma.reservation.delete({ where: { id } });
  }
}
