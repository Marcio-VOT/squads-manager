import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AuthGuard } from '../auth/authGuard/auth.guard';
import { AuthAdminGuard } from '../auth/authGuard/authAdmin.guard';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createAreaDto: CreateAreaDto) {
    return await this.areaService.create(createAreaDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.areaService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('alldata')
  async findAreaAndAllDataById() {
    return await this.areaService.findAreaAndAllDataById();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.areaService.findOne(id);
  }

  @UseGuards(AuthAdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return await this.areaService.update(id, updateAreaDto);
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.areaService.remove(id);
  }
}
