import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StackService } from './stack.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';

@Controller('stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @Post()
  create(@Body() createStackDto: CreateStackDto) {
    return this.stackService.create(createStackDto);
  }

  @Get()
  findAll() {
    return this.stackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStackDto: UpdateStackDto) {
    return this.stackService.update(+id, updateStackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stackService.remove(+id);
  }
}
