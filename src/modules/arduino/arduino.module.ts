import { Module } from '@nestjs/common';
import { ArduinoService } from './arduino.service';
import { ArduinoController } from './arduino.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arduino } from '../../entities';
import { ComponentModule } from '../component/component.module';
import { ComposeComponentModule } from '../compose-component/compose-component.module';

@Module({
  imports: [TypeOrmModule.forFeature([Arduino]),
    ComponentModule,
    ComposeComponentModule
  ],
  controllers: [ArduinoController],
  providers: [ArduinoService],
  exports: [ArduinoService]
})
export class ArduinoModule { }
