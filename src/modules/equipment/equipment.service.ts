import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from '../../entities';
import { Repository } from 'typeorm';
import { BaseEquipmentService } from '../base-equipment/base-equipment.service';
import { ComposeComponentService } from '../compose-component/compose-component.service';

@Injectable()
export class EquipmentService {


  constructor(
    @InjectRepository(Equipment) private equipmentRepository: Repository<Equipment>,
    private baseEquipmentService: BaseEquipmentService,
    private composeComponentService: ComposeComponentService
  ) { }

  async create(createEquipmentDto: CreateEquipmentDto) {
    const { description, baseEquipmentId, composeComponentIds } = createEquipmentDto;
    const baseEquipment = await this.baseEquipmentService.findOne(baseEquipmentId);
    const composeComponents = await Promise.all(composeComponentIds.map(async cComponentId => {
      const composeComponent = await this.composeComponentService.findOne(cComponentId);
      return composeComponent;
    }));

    const equipment = this.equipmentRepository.create({ description });
    equipment.baseEquipment = baseEquipment;
    equipment.composeComponents = composeComponents;
    return await this.equipmentRepository.save(equipment);
  }

  async findAll() {
    return await this.equipmentRepository.find({
      where: { isActive: true },
      relations: ['baseEquipment', 'composeComponents', 'composeComponents.arduino']
    });
  }

  async findOne(id: string) {
    return await this.equipmentRepository.findOne({
      where: { id },
      relations: ['baseEquipment', 'composeComponents', 'composeComponents.arduino']
    });
  }

  async saveAndGetEquipment(createEquipmentDto: CreateEquipmentDto) {
    const equipment = await this.create(createEquipmentDto);
    return await this.findOne(equipment.id);
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    const { description, isActive } = updateEquipmentDto;
    const equipment = await this.findOne(id);
    equipment.description = description;
    equipment.isActive = isActive;
    return await this.equipmentRepository.save(equipment);
  }

  async remove(id: string) {
    const equipment = await this.findOne(id);
    equipment.isActive = false;
    return await this.equipmentRepository.save(equipment);

  }

  async findAllPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = limit;
    return await this.equipmentRepository.findAndCount({
      where: { isActive: true },
      relations: ['baseEquipment', 'composeComponents', 'composeComponents.arduino'],
      skip,
      take
    });
  }
}
