import { Controller, Post, Get, Delete, Body, Query, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationDto } from './dto/reservation.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
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
  async createReservation(@Body() reservationDto: ReservationDto) {
    return this.reservationsService.createReservation(reservationDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all reservations for a user' })
  @ApiQuery({ name: 'user_id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of reservations' })
  async getReservations(@Query('user_id', ParseIntPipe) user_id: number) {
    return this.reservationsService.getUserReservations(user_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Cancel a reservation' })
  @ApiResponse({ status: 200, description: 'Reservation canceled' })
  @ApiResponse({ status: 404, description: 'Reservation not found' })
  async cancelReservation(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.cancelReservation(id);
  }
}
