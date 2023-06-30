import { Test, TestingModule } from '@nestjs/testing';
import { ComposeComponentService } from './compose-component.service';

describe('ComposeComponentService', () => {
  let service: ComposeComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComposeComponentService],
    }).compile();

    service = module.get<ComposeComponentService>(ComposeComponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
