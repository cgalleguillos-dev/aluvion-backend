import { Module } from '@nestjs/common';
import { BaseEquipmentService } from './base-equipment.service';
import { BaseEquipmentController } from './base-equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEquipment } from '../../entities';
import { ArduinoModule } from '../arduino/arduino.module';

@Module({
  imports: [TypeOrmModule.forFeature([BaseEquipment]), ArduinoModule],
  controllers: [BaseEquipmentController],
  providers: [BaseEquipmentService]
})
export class BaseEquipmentModule { }
