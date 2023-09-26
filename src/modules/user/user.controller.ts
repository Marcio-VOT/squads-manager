import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import { AuthAdminGuard } from '../auth/authGuard/authAdmin.guard';
import { AuthGuard } from '../auth/authGuard/auth.guard';
import { UserRequest } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDataDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthAdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  findOne(@UserRequest() user: User & { team: { name: string } }) {
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.team_id;
    return { ...user, team: user.team.name };
  }

  @UseGuards(AuthAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
