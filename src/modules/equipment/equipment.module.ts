import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from '../../entities';
import { BaseEquipmentModule } from '../base-equipment/base-equipment.module';
import { ComposeComponentModule } from '../compose-component/compose-component.module';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment]), BaseEquipmentModule, ComposeComponentModule],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule { }
