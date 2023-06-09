import { Test, TestingModule } from '@nestjs/testing';
import { BaseEquipmentService } from './base-equipment.service';

describe('BaseEquipmentService', () => {
  let service: BaseEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseEquipmentService],
    }).compile();

    service = module.get<BaseEquipmentService>(BaseEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
