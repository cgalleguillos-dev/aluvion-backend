import { Injectable } from '@nestjs/common';
import { CreateComposeComponentDto } from './dto/create-compose-component.dto';
import { UpdateComposeComponentDto } from './dto/update-compose-component.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComposeComponent } from '../../entities';
import { PinService } from '../pin/pin.service';
import { ComponentService } from '../component/component.service';
import { TypeComponentService } from '../type-component/type-component.service';

@Injectable()
export class ComposeComponentService {

  constructor(
    @InjectRepository(ComposeComponent) private composeComponentRepository: Repository<ComposeComponent>,
    private pinService: PinService,
    private componentService: ComponentService,
    private typeComponentService: TypeComponentService
  ) { }

  async create(createComposeComponentDto: CreateComposeComponentDto) {
    console.log(createComposeComponentDto)
    const { description, pins, components, typeComponent } = createComposeComponentDto;
    console.log(pins)
    const typeComponentEntity = await this.typeComponentService.findOneByDescription(typeComponent);
    const pinsEntity = await Promise.all(pins.map(async pin => {
      const pinEntity = await this.pinService.create(pin);
      return pinEntity;
    }));
    const componente = this.composeComponentRepository.create({ description, pins: pinsEntity });
    if (components) {
      const componentsEntity = await Promise.all(components.map(async component => {
        const componentEntity = await this.componentService.create(component);
        return componentEntity;
      }
      ));
      componente.components = componentsEntity;
    }
    componente.typeComponent = typeComponentEntity;
    return await this.composeComponentRepository.save(componente);
  }

  async findAll() {
    return await this.composeComponentRepository.find({
      relations: ['components', 'components.pins']
    });
  }

  async findOne(id: string) {
    return await this.composeComponentRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateComposeComponentDto: UpdateComposeComponentDto) {
    return `This action updates a #${id} composeComponent`;
  }

  remove(id: number) {
    return `This action removes a #${id} composeComponent`;
  }
}
