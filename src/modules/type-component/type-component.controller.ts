import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeComponentService } from './type-component.service';
import { CreateTypeComponentDto } from './dto/create-type-component.dto';
import { UpdateTypeComponentDto } from './dto/update-type-component.dto';

@Controller('type-component')
export class TypeComponentController {
  constructor(private readonly typeComponentService: TypeComponentService) { }

  @Post()
  async create(@Body() createTypeComponentDto: CreateTypeComponentDto) {
    return await this.typeComponentService.create(createTypeComponentDto);
  }

  @Get()
  async findAll() {
    return await this.typeComponentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.typeComponentService.findOne(+id);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.typeComponentService.remove(+id);
  }
}
