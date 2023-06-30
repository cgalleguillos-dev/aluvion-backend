import { Module } from '@nestjs/common';
import { TypeComponentService } from './type-component.service';
import { TypeComponentController } from './type-component.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeComponent } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([TypeComponent])],
  controllers: [TypeComponentController],
  providers: [TypeComponentService],
  exports: [TypeComponentService]
})
export class TypeComponentModule { }
