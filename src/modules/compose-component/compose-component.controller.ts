import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComposeComponentService } from './compose-component.service';
import { CreateComposeComponentDto } from './dto/create-compose-component.dto';
import { UpdateComposeComponentDto } from './dto/update-compose-component.dto';

@Controller('compose-component')
export class ComposeComponentController {
  constructor(private readonly composeComponentService: ComposeComponentService) { }

  @Post()
  create(@Body() createComposeComponentDto: CreateComposeComponentDto) {
    return this.composeComponentService.create(createComposeComponentDto);
  }

  @Get()
  findAll() {
    return this.composeComponentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.composeComponentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComposeComponentDto: UpdateComposeComponentDto) {
    return this.composeComponentService.update(+id, updateComposeComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.composeComponentService.remove(+id);
  }
}
