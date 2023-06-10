import { Test, TestingModule } from '@nestjs/testing';
import { ArduinoController } from './arduino.controller';
import { ArduinoService } from './arduino.service';

describe('ArduinoController', () => {
  let controller: ArduinoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArduinoController],
      providers: [ArduinoService],
    }).compile();

    controller = module.get<ArduinoController>(ArduinoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
