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
import { StackService } from './stack.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { AuthGuard } from '../auth/authGuard/auth.guard';
import { UserRequest } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { AuthAdminGuard } from '../auth/authGuard/authAdmin.guard';

@Controller('stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createStackDto: CreateStackDto,
    @UserRequest() user: User,
  ) {
    return await this.stackService.create(createStackDto, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.stackService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.stackService.findOne(id);
  }

  @UseGuards(AuthAdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStackDto: UpdateStackDto,
  ) {
    return await this.stackService.update(id, updateStackDto);
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.stackService.remove(id);
  }
}
