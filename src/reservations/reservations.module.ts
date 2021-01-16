import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), VehiclesModule, LocationsModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService]
})
export class ReservationsModule {}
