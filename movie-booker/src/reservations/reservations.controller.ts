import { Controller, Post, Get, Delete, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationDto } from './dto/reservation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({ status: 201, description: 'Reservation created' })
  @ApiResponse({ status: 400, description: 'Conflict: Overlapping reservation' })
  async createReservation(@Body() reservationDto: ReservationDto, @Req() req) {
    return this.reservationsService.createReservation(reservationDto, req);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all reservations for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of reservations' })
  async getReservations(@Req() req) {
    return this.reservationsService.getUserReservations(req);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Cancel a reservation' })
  @ApiResponse({ status: 200, description: 'Reservation canceled' })
  @ApiResponse({ status: 404, description: 'Reservation not found' })
  async cancelReservation(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.reservationsService.cancelReservation(id);
  }
}
