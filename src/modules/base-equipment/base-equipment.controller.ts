import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseEquipmentService } from './base-equipment.service';
import { CreateBaseEquipmentDto } from './dto/create-base-equipment.dto';

@Controller('base-equipment')
export class BaseEquipmentController {
  constructor(private readonly baseEquipmentService: BaseEquipmentService) { }

  @Post()
  async create(@Body() createBaseEquipmentDto: CreateBaseEquipmentDto) {
    return await this.baseEquipmentService.create(createBaseEquipmentDto);
  }

  @Post('bulk')
  async createBulk(@Body() createBaseEquipmentDto: CreateBaseEquipmentDto[]) {
    return await this.baseEquipmentService.createBulk(createBaseEquipmentDto);
  }

  @Get()
  async findAll() {
    return await this.baseEquipmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.baseEquipmentService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseEquipmentService.remove(id);
  }
}
