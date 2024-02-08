import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { SquadService } from './squad.service';

@Controller('todo')
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Get()
  findAll() {
    return this.squadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.squadService.findOne(id);
  }

  @Post()
  create(@Body() createSquadDto: CreateSquadDto) {
    return this.squadService.create(createSquadDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSquadDto: UpdateSquadDto,
  ) {
    return this.squadService.update(id, updateSquadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.squadService.remove(id);
  }
}
