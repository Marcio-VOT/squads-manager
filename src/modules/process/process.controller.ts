import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { AuthAdminGuard } from '../auth/authGuard/authAdmin.guard';
import { AuthGuard } from '../auth/authGuard/auth.guard';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createProcessDto: CreateProcessDto) {
    return await this.processService.create(createProcessDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.processService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.processService.findOne(id);
  }

  @UseGuards(AuthAdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProcessDto: UpdateProcessDto,
  ) {
    return await this.processService.update(id, updateProcessDto);
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.processService.remove(id);
  }
}
