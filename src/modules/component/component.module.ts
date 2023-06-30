import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentController } from './component.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from '../../entities';
import { PinModule } from '../pin/pin.module';
import { TypeComponentModule } from '../type-component/type-component.module';

@Module({
  imports: [TypeOrmModule.forFeature([Component]),
    PinModule,
    TypeComponentModule
  ],
  controllers: [ComponentController],
  providers: [ComponentService],
  exports: [ComponentService]
})
export class ComponentModule { }
