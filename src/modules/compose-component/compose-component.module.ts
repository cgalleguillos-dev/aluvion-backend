import { Module } from '@nestjs/common';
import { ComposeComponentService } from './compose-component.service';
import { ComposeComponentController } from './compose-component.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComposeComponent } from '../../entities';
import { PinModule } from '../pin/pin.module';
import { ComponentModule } from '../component/component.module';
import { TypeComponentModule } from '../type-component/type-component.module';

@Module({
  imports: [TypeOrmModule.forFeature([ComposeComponent]),
    PinModule,
    ComponentModule,
    TypeComponentModule
  ],
  controllers: [ComposeComponentController],
  providers: [ComposeComponentService],
  exports: [ComposeComponentService]
})
export class ComposeComponentModule { }
