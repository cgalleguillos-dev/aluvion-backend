import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { ComponentModule } from './modules/component/component.module';
import { SimulationModule } from './modules/simulation/simulation.module';
import { BaseEquipmentModule } from './modules/base-equipment/base-equipment.module';
import { PinModule } from './modules/pin/pin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...DataSourceConfig
    }),
    EquipmentModule,
    ComponentModule,
    SimulationModule,
    BaseEquipmentModule,
    PinModule
  ],
})
export class AppModule { }
