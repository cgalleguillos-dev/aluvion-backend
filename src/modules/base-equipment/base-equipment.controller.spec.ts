import { Test, TestingModule } from '@nestjs/testing';
import { BaseEquipmentController } from './base-equipment.controller';
import { BaseEquipmentService } from './base-equipment.service';

describe('BaseEquipmentController', () => {
  let controller: BaseEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseEquipmentController],
      providers: [BaseEquipmentService],
    }).compile();

    controller = module.get<BaseEquipmentController>(BaseEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
