import { Injectable } from '@nestjs/common';
import { CreatePinDto } from './dto/create-pin.dto';
import { UpdatePinDto } from './dto/update-pin.dto';
import { Pin } from '../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PinService {
  constructor(
    @InjectRepository(Pin)
    private pinRepository: Repository<Pin>,
  ) { }
  async create(createPinDto: CreatePinDto) {
    return await this.pinRepository.save(createPinDto);
  }

  async findAll() {
    return await this.pinRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} pin`;
  }

  update(id: number, updatePinDto: UpdatePinDto) {
    return `This action updates a #${id} pin`;
  }

  remove(id: number) {
    return `This action removes a #${id} pin`;
  }
}
