import { Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Repository } from 'typeorm';
import { Component } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { PinService } from '../pin/pin.service';

@Injectable()
export class ComponentService {

  constructor(
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
    private pinService: PinService
  ) { }

  async create(createComponentDto: CreateComponentDto) {
    const { description, pins } = createComponentDto;
    const pinsEntity = await Promise.all(pins.map(async pin => {
      const pinEntity = await this.pinService.create(pin);
      return pinEntity;
    }));

    const component = this.componentRepository.create({ description, pins: pinsEntity });

    return await this.componentRepository.save(component);
  }

  async findAll() {
    return await this.componentRepository.find({
      relations: ['pins']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} component`;
  }

  update(id: number, updateComponentDto: UpdateComponentDto) {
    return `This action updates a #${id} component`;
  }

  async remove(id: string) {
    return await this.componentRepository.delete(id);
  }
}
