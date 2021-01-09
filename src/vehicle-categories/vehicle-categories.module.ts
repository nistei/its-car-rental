import { Module } from '@nestjs/common';
import { VehicleCategoriesService } from './vehicle-categories.service';
import { VehicleCategoriesController } from './vehicle-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleCategory } from './entities/vehicle-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleCategory])],
  controllers: [VehicleCategoriesController],
  providers: [VehicleCategoriesService],
  exports: [VehicleCategoriesService],
})
export class VehicleCategoriesModule {}
