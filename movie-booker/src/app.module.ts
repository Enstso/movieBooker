import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles/roles.guard';
import { AuthController } from './auth/auth.controller';
import { MoviesModule } from './movies/movies.module';
import { ReservationsController } from './reservations/reservations.controller';
import { ReservationsModule } from './reservations/reservations.module';
import { MoviesController } from './movies/movies.controller';
import { AuthService } from './auth/auth.service';
import { ReservationsService } from './reservations/reservations.service';
import { MoviesService } from './movies/movies.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [AuthModule, UsersModule, MoviesModule, ReservationsModule],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },AppService],
})
export class AppModule {}
