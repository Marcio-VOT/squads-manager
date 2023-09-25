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
import { MethodService } from './method.service';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { AuthGuard } from '../auth/authGuard/auth.guard';
import { AuthAdminGuard } from '../auth/authGuard/authAdmin.guard';
import { UserRequest } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('method')
export class MethodController {
  constructor(private readonly methodService: MethodService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMethodDto: CreateMethodDto, @UserRequest() user: User) {
    return this.methodService.create(createMethodDto, user.team_id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.methodService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('subprocess/:id')
  findAllBySubProcessId(@Param('id', ParseIntPipe) id: number) {
    return this.methodService.findAllBySubProcessId(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.methodService.findOne(id);
  }

  @UseGuards(AuthAdminGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMethodDto: UpdateMethodDto,
  ) {
    return this.methodService.update(id, updateMethodDto);
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.methodService.remove(id);
  }
}
