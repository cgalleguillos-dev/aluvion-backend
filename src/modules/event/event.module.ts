import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../entities';
import { ComposeComponentModule } from '../compose-component/compose-component.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), ComposeComponentModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule { }
