import { Injectable } from '@nestjs/common';
import { CreateBaseEquipmentDto } from './dto/create-base-equipment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEquipment } from '../../entities';
import { ArduinoService } from '../arduino/arduino.service';

@Injectable()
export class BaseEquipmentService {

  constructor(
    @InjectRepository(BaseEquipment)
    private baseEquipmentRepository: Repository<BaseEquipment>,
    private arduinoService: ArduinoService
  ) { }

  async create(createBaseEquipmentDto: CreateBaseEquipmentDto) {
    const { description, arduinos } = createBaseEquipmentDto;
    const baseEquipment = this.baseEquipmentRepository.create({ description });
    const arduinosEntity = await Promise.all(arduinos.map(async arduino => {
      const arduinoEntity = await this.arduinoService.create(arduino);
      return arduinoEntity;
    }
    ));

    baseEquipment.arduinos = arduinosEntity;
    return await this.baseEquipmentRepository.save(baseEquipment);
  }



  async createBulk(createBaseEquipmentDto: CreateBaseEquipmentDto[]) {
    const baseEquipments = await Promise.all(createBaseEquipmentDto.map(async baseEquipment => {
      const baseEquipmentEntity = await this.create(baseEquipment);
      return baseEquipmentEntity;
    }));

    return baseEquipments;
  }

  async findAll() {
    return await this.baseEquipmentRepository.find({
      relations: ['arduinos', 'arduinos.components', 'arduinos.components.typeComponent',
        'arduinos.components.pins', 'arduinos.composeComponents', 'arduinos.composeComponents.typeComponent',
        'arduinos.composeComponents.pins', 'arduinos.composeComponents.components',
      ]
    });
  }

  async findOne(id: string) {
    return await this.baseEquipmentRepository.findOne({
      where: { id },
    }
    );
  }

  remove(id: string) {
    return `This action removes a #${id} baseEquipment`;
  }

}