import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../entities';
import { Repository } from 'typeorm';
import { ComposeComponentService } from '../compose-component/compose-component.service';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    private composeComponentService: ComposeComponentService,
  ) { }

  async create(createEventDto: CreateEventDto) {
    const { valveId, intensity, time } = createEventDto;
    const composeComponent = await this.composeComponentService.findOne(valveId);
    const event = this.eventRepository.create({ intensity, time, composeComponent });
    return await this.eventRepository.save(event);
  }

  async createMany(createEventDto: CreateEventDto[]) {
    const events = await Promise.all(createEventDto.map(async event => {
      const { valveId, intensity, time } = event;
      const composeComponent = await this.composeComponentService.findOne(valveId);
      const eventEntity = this.eventRepository.create({ intensity, time, composeComponent });
      return eventEntity;
    }));
    return await this.eventRepository.save(events);
  }
  async findAll() {
    return await this.eventRepository.find({
      relations: ['simulation', 'composeComponent']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
