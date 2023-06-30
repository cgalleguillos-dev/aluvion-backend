import { Injectable } from '@nestjs/common';
import { CreateTypeComponentDto } from './dto/create-type-component.dto';
import { UpdateTypeComponentDto } from './dto/update-type-component.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeComponent } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class TypeComponentService {

  constructor(
    @InjectRepository(TypeComponent) private typeComponentRepository: Repository<TypeComponent>
  ) { }

  async create(createTypeComponentDto: CreateTypeComponentDto) {
    const typeComponent = this.typeComponentRepository.create(createTypeComponentDto);
    return await this.typeComponentRepository.save(typeComponent);
  }

  async findAll() {
    return await this.typeComponentRepository.find();
  }

  async findOne(id: number) {
    return await this.typeComponentRepository.findOne({
      where: { id }
    });
  }

  async findOneByDescription(description: string) {
    return await this.typeComponentRepository.findOne({
      where: { description }
    });
  }
  update(id: number, updateTypeComponentDto: UpdateTypeComponentDto) {
    return `This action updates a #${id} typeComponent`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeComponent`;
  }
}
