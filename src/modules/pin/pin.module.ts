import { Module } from '@nestjs/common';
import { PinService } from './pin.service';
import { PinController } from './pin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pin } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Pin])],
  controllers: [PinController],
  providers: [PinService],
  exports: [PinService]
})
export class PinModule { }
