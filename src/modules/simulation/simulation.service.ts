import { Injectable } from '@nestjs/common';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arduino, ComposeComponent, Equipment, Event, Simulation } from '../../entities';
import { EquipmentService } from '../equipment/equipment.service';
import { EventService } from '../event/event.service';
import { OutputExecution } from './dto/output-execution.dto';

@Injectable()
export class SimulationService {

  constructor(
    @InjectRepository(Simulation) private simulationRepository: Repository<Simulation>,
    private equipmentService: EquipmentService,
    private eventService: EventService
  ) { }

  private generateOutputExecution({ equipment, eventList, arduinos, components }: {
    equipment: Equipment,
    eventList: Event[],
    arduinos: Arduino[],
    components: ComposeComponent[]
  }): OutputExecution {
    const outputExecution: OutputExecution = {
      setup: {
        type: 'setup',
        equipment: equipment.description,
        arduinos: arduinos.map(arduino => arduino.description),
        components: components.map(component => {
          return {
            description: component.description,
            pins: component.pins.map(pin => {
              return {
                pin: pin.pinNumber,
                mode: pin.comunicationType
              }
            })
          }
        })
      },
      simulation: {
        type: 'simulación',
        events: eventList.map(event => {
          return {
            startTime: event.startTime,
            endTime: event.endTime,
            component: event.composeComponent.description,
            intensity: event.intensity
          }
        }
        )
      }
    }
    return outputExecution;
  }

  async create(createSimulationDto: CreateSimulationDto) {
    const { description, equipmentId, date, events } = createSimulationDto;
    const equipment = await this.equipmentService.findOne(equipmentId);
    const simulation = this.simulationRepository.create({ description, equipment, date });
    const eventEntities = await this.eventService.createMany(events);
    simulation.eventList = eventEntities;
    return await this.simulationRepository.save(simulation);
  }

  async findAll() {
    return await this.simulationRepository.find({
      relations: ['equipment', 'eventList', 'eventList.composeComponent']
    });
  }

  async execute(id: string): Promise<OutputExecution> {
    const simulation = await this.findOne(id);
    const equipment = simulation.equipment;
    const eventList = simulation.eventList;
    const arduinos = equipment.baseEquipment.arduinos;
    const components = equipment.composeComponents;
    return this.generateOutputExecution({ equipment, eventList, arduinos, components });
  }

  async findOne(id: string) {
    return await this.simulationRepository.findOne({
      where: {
        id
      },
      relations: ['equipment', 'eventList', 'eventList.composeComponent',
        'eventList.composeComponent.arduino', 'eventList.composeComponent.pins', 'equipment.baseEquipment',
        'equipment.baseEquipment.arduinos', 'equipment.composeComponents', 'equipment.composeComponents.pins'
      ]
    });
  }

  update(id: number, updateSimulationDto: UpdateSimulationDto) {
    return `This action updates a #${id} simulation`;
  }

  remove(id: number) {
    return `This action removes a #${id} simulation`;
  }
}
