import { Test, TestingModule } from '@nestjs/testing';
import { TypeComponentService } from './type-component.service';

describe('TypeComponentService', () => {
  let service: TypeComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeComponentService],
    }).compile();

    service = module.get<TypeComponentService>(TypeComponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
