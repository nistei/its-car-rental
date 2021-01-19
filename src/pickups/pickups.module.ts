import { Module } from '@nestjs/common';
import { PickupsService } from './pickups.service';
import { PickupsController } from './pickups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pickup } from './entities/pickup.entity';
import { ReservationsModule } from '../reservations/reservations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pickup]), ReservationsModule],
  controllers: [PickupsController],
  providers: [PickupsService]
})
export class PickupsModule {}
