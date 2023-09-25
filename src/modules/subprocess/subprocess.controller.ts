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
import { SubprocessService } from './subprocess.service';
import { CreateSubprocessDto } from './dto/create-subprocess.dto';
import { UpdateSubprocessDto } from './dto/update-subprocess.dto';
import { AuthGuard } from '../auth/authGuard/auth.guard';
import { AuthAdminGuard } from '../auth/authGuard/authAdmin.guard';
import { UserRequest } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('subprocess')
export class SubprocessController {
  constructor(private readonly subprocessService: SubprocessService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createSubprocessDto: CreateSubprocessDto,
    @UserRequest() user: User,
  ) {
    return await this.subprocessService.create(createSubprocessDto, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.subprocessService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.subprocessService.findOne(id);
  }

  @UseGuards(AuthAdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubprocessDto: UpdateSubprocessDto,
  ) {
    return await this.subprocessService.update(id, updateSubprocessDto);
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.subprocessService.remove(id);
  }
}
