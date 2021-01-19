import { Module } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { ReturnsController } from './returns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Return } from './entities/return.entity';
import { ReservationsModule } from '../reservations/reservations.module';
import { PickupsModule } from '../pickups/pickups.module';

@Module({
  imports: [TypeOrmModule.forFeature([Return]), ReservationsModule, PickupsModule],
  controllers: [ReturnsController],
  providers: [ReturnsService]
})
export class ReturnsModule {}
