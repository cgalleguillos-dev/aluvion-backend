import { Injectable } from '@nestjs/common';
import { CreateArduinoDto } from './dto/create-arduino.dto';
import { UpdateArduinoDto } from './dto/update-arduino.dto';
import { Repository } from 'typeorm';
import { Arduino } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentService } from '../component/component.service';

@Injectable()
export class ArduinoService {

  constructor(
    @InjectRepository(Arduino) private arduinoRepository: Repository<Arduino>,
    private componentService: ComponentService,
  ) { }
  async create(createArduinoDto: CreateArduinoDto) {
    const { description, components } = createArduinoDto;
    const arduino = this.arduinoRepository.create({ description });
    const componentsEntity = await Promise.all(components.map(async component => {
      const componentEntity = await this.componentService.create(component);
      return componentEntity;
    }));
    arduino.components = componentsEntity;
    return await this.arduinoRepository.save(arduino);
  }

  async findAll() {
    return await this.arduinoRepository.find({
      relations: ['components', 'components.pins']
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