import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SimulationController } from './simulation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Simulation } from '../../entities';
import { EquipmentModule } from '../equipment/equipment.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([Simulation]), EquipmentModule, EventModule],
  controllers: [SimulationController],
  providers: [SimulationService],
  exports: [SimulationService],
})
export class SimulationModule { }
