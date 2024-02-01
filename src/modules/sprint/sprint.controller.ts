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
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @Get()
  findAll() {
    return this.sprintService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sprintService.findOne(id);
  }

  @Get('product/:id')
  findaLLMemberByProductId(@Param('id', ParseIntPipe) id: number) {
    return this.sprintService.findaLLMemberByProductId(id);
  }

  @Get('squad/:id')
  findaLLMemberBySquadId(@Param('id', ParseIntPipe) id: number) {
    return this.sprintService.findaLLMemberBySquadId(id);
  }

  @Post()
  create(@Body() createMemberDto: CreateSprintDto) {
    return this.sprintService.create(createMemberDto);
  }
  //rever

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberDto: UpdateSprintDto,
  ) {
    return this.sprintService.update(id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sprintService.remove(id);
  }
}
