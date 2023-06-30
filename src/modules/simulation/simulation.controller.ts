import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';

@Controller('simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) { }

  @Post()
  async create(@Body() createSimulationDto: CreateSimulationDto) {
    return await this.simulationService.create(createSimulationDto);
  }

  @Get()
  async findAll() {
    return await this.simulationService.findAll();
  }

  @Get(':id/execute')
  async execute(@Param('id') id: string) {
    return await this.simulationService.execute(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simulationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSimulationDto: UpdateSimulationDto) {
    return this.simulationService.update(+id, updateSimulationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simulationService.remove(+id);
  }
}
