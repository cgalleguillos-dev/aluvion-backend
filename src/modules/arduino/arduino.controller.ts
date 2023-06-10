import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArduinoService } from './arduino.service';
import { CreateArduinoDto } from './dto/create-arduino.dto';
import { UpdateArduinoDto } from './dto/update-arduino.dto';

@Controller('arduino')
export class ArduinoController {
  constructor(private readonly arduinoService: ArduinoService) { }

  @Post()
  async create(@Body() createArduinoDto: CreateArduinoDto) {
    return await this.arduinoService.create(createArduinoDto);
  }

  @Get()
  async findAll() {
    return await this.arduinoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arduinoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArduinoDto: UpdateArduinoDto) {
    return this.arduinoService.update(id, updateArduinoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arduinoService.remove(id);
  }
}
