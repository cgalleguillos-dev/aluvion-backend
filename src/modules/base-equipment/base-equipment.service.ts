import { Injectable } from '@nestjs/common';
import { CreateBaseEquipmentDto } from './dto/create-base-equipment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEquipment } from '../../entities';
import { ComponentService } from '../component/component.service';
import { PinService } from '../pin/pin.service';

@Injectable()
export class BaseEquipmentService {

  constructor(
    @InjectRepository(BaseEquipment)
    private baseEquipmentRepository: Repository<BaseEquipment>,
    private componentService: ComponentService,

  ) { }

  async create(createBaseEquipmentDto: CreateBaseEquipmentDto) {
    const { description, components } = createBaseEquipmentDto;
    const baseEquipment = this.baseEquipmentRepository.create({ description });
    const newComponents = await Promise.all(components.map(async component => {
      const componentEntity = await this.componentService.create(component);
      return componentEntity;
    }));

    baseEquipment.components = newComponents;

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
      relations: ['components', 'components.pins']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} baseEquipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} baseEquipment`;
  }
}
