import { Injectable } from '@nestjs/common';
import { CreateArduinoDto } from './dto/create-arduino.dto';
import { UpdateArduinoDto } from './dto/update-arduino.dto';
import { Repository } from 'typeorm';
import { Arduino } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentService } from '../component/component.service';
import { ComposeComponentService } from '../compose-component/compose-component.service';

@Injectable()
export class ArduinoService {

  constructor(
    @InjectRepository(Arduino) private arduinoRepository: Repository<Arduino>,
    private componentService: ComponentService,
    private composeComponent: ComposeComponentService
  ) { }
  async create(createArduinoDto: CreateArduinoDto) {
    const { description, components } = createArduinoDto;
    const arduino = this.arduinoRepository.create({ description });
    if (components) {
      const componentsEntity = await Promise.all(components.map(async component => {
        if (!component.components?.length) {
          const componentEntity = await this.componentService.create(component);
          return componentEntity;
        }
      }
      ));
      arduino.components = componentsEntity;
      const composeComponentsEntity = await Promise.all(components.map(async component => {
        if (component.components?.length) {
          const composeComponentEntity = await this.composeComponent.create(component);
          return composeComponentEntity;
        }
      }
      ));
      arduino.composeComponents = composeComponentsEntity;
    }

    return await this.arduinoRepository.save(arduino);
  }

  async findAll() {
    return await this.arduinoRepository.find({
      relations: ['components', 'components.pins', 'components.components', 'components.components.pins']
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} arduino`;
  }

  update(id: string, updateArduinoDto: UpdateArduinoDto) {
    return `This action updates a #${id} arduino`;
  }

  remove(id: string) {
    return `This action removes a #${id} arduino`;
  }
}