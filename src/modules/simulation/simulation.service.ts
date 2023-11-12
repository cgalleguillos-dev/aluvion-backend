import { Injectable } from '@nestjs/common';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arduino, ComposeComponent, Equipment, Event, Simulation } from '../../entities';
import { EquipmentService } from '../equipment/equipment.service';
import { EventService } from '../event/event.service';
import { OutputExecution } from './dto/output-execution.dto';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';
import { ArduinoService } from '../arduino/arduino.service';
import { ManualExecution } from './dto/manual-execution.dto';

@Injectable()
export class SimulationService {

  constructor(
    @InjectRepository(Simulation) private simulationRepository: Repository<Simulation>,
    private equipmentService: EquipmentService,
    private eventService: EventService,
    private readonly httpService: HttpService,
    private readonly arduinoService: ArduinoService
  ) { }

  private generateOutputExecution({ eventList, arduinos, components }: {
    eventList: Event[],
    arduinos: Arduino[],
    components: ComposeComponent[]
  }): OutputExecution {

    eventList.sort((a, b) => a.startTime - b.startTime);

    const outputExecution: OutputExecution = {
      setup: {
        arduinos: arduinos.map(arduino => {
          const arduinoWithPins = {
            id: arduino.id,
            pins: []
          };
          const arduinoComponents = components.filter(component => component.arduino.id === arduino.id);

          arduinoComponents.forEach(component => {
            component.pins.forEach(pin => {
              arduinoWithPins.pins.push({
                pin: pin.pinNumber,
                mode: "OUTPUT"
              });
            });
          });
          return arduinoWithPins;
        })
      },
      sequence: {
        sequence: eventList.map(event => {
          return {
            arduino: event.composeComponent.arduino.id,
            time: event.endTime - event.startTime,
            position: event.intensity * 10
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
      relations: ['equipment', 'eventList', 'eventList.composeComponent',
        'eventList.composeComponent.arduino', 'eventList.composeComponent.pins', 'equipment.baseEquipment',
        'equipment.baseEquipment.arduinos', 'equipment.composeComponents', 'equipment.composeComponents.pins'
      ]
    });
  }


  async manualExecute(manualExecution: ManualExecution) {
    const { idArduino, idComposeComponent, position } = manualExecution;
    const arduino = await this.arduinoService.findOne(idArduino);
    // busca la valvula en el arduino
    const composeComponent = arduino.composeComponents.find(composeComponent => composeComponent.id === idComposeComponent);

    const outputExecution = {
      setup: {
        arduinos: [
          {
            id: arduino.id,
            pins: composeComponent.pins.map(pin => {
              return {
                pin: pin.pinNumber,
                mode: "OUTPUT"
              }
            })
          }
        ]
      },
      sequence: {
        sequence: [
          {
            arduino: arduino.id,
            time: 10,
            position: position * 10
          }
        ]
      }
    }
    try {
      const response = await this.httpService.post('http://127.0.0.1:5000/manual-execute', outputExecution).subscribe(
        (response) => {
          console.log(response);
        }
      );
      console.log(response);
      return outputExecution;
    } catch (error) {
      console.error('Error sending data to server:', error);
      throw error;
    }
  }

  async execute(id: string) {
    const simulation = await this.findOne(id);
    const equipment = simulation.equipment;
    const eventList = simulation.eventList;
    const arduinos = equipment.baseEquipment.arduinos;
    const components = equipment.composeComponents;
    const outputExecution = this.generateOutputExecution({ eventList, arduinos, components });
    try {
      const response = await this.httpService.post('http://127.0.0.1:5000/execute', outputExecution).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(response);
      return outputExecution;
    } catch (error) {
      console.error('Error sending data to server:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    return await this.simulationRepository.findOne({
      where: {
        id
      },
      relations: ['equipment', 'eventList', 'eventList.composeComponent',
        'eventList.composeComponent.arduino', 'eventList.composeComponent.pins', 'equipment.baseEquipment',
        'equipment.baseEquipment.arduinos', 'equipment.composeComponents', 'equipment.composeComponents.pins', 'equipment.composeComponents.arduino'
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
