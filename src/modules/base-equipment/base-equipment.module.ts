import { Module } from '@nestjs/common';
import { BaseEquipmentService } from './base-equipment.service';
import { BaseEquipmentController } from './base-equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEquipment } from '../../entities';
import { ComponentModule } from '../component/component.module';
import { PinModule } from '../pin/pin.module';
import { ArduinoModule } from '../arduino/arduino.module';

@Module({
  imports: [TypeOrmModule.forFeature([BaseEquipment]), PinModule, ComponentModule, ArduinoModule],
  controllers: [BaseEquipmentController],
  providers: [BaseEquipmentService]
})
export class BaseEquipmentModule { }
