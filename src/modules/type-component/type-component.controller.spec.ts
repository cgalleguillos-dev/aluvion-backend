import { Test, TestingModule } from '@nestjs/testing';
import { TypeComponentController } from './type-component.controller';
import { TypeComponentService } from './type-component.service';

describe('TypeComponentController', () => {
  let controller: TypeComponentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeComponentController],
      providers: [TypeComponentService],
    }).compile();

    controller = module.get<TypeComponentController>(TypeComponentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
