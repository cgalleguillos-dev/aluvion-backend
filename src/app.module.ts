import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { ComponentModule } from './modules/component/component.module';
import { SimulationModule } from './modules/simulation/simulation.module';
import { BaseEquipmentModule } from './modules/base-equipment/base-equipment.module';
import { PinModule } from './modules/pin/pin.module';
import { ArduinoModule } from './modules/arduino/arduino.module';
import { TypeComponentModule } from './modules/type-component/type-component.module';
import { ComposeComponentModule } from './modules/compose-component/compose-component.module';
import { EventModule } from './modules/event/event.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

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
    PinModule,
    ArduinoModule,
    TypeComponentModule,
    ComposeComponentModule,
    EventModule,
    AuthModule,
    UsersModule
  ],
})
export class AppModule { }
