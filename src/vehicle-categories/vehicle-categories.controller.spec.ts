import { Test, TestingModule } from '@nestjs/testing';
import { VehicleCategoriesController } from './vehicle-categories.controller';
import { VehicleCategoriesService } from './vehicle-categories.service';

describe('VehicleCategoriesController', () => {
  let controller: VehicleCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleCategoriesController],
      providers: [VehicleCategoriesService],
    }).compile();

    controller = module.get<VehicleCategoriesController>(VehicleCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
