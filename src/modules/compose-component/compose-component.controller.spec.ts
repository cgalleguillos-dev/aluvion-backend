import { Test, TestingModule } from '@nestjs/testing';
import { ComposeComponentController } from './compose-component.controller';
import { ComposeComponentService } from './compose-component.service';

describe('ComposeComponentController', () => {
  let controller: ComposeComponentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComposeComponentController],
      providers: [ComposeComponentService],
    }).compile();

    controller = module.get<ComposeComponentController>(ComposeComponentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
