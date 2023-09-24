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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user.
   * @param createUserDto The data for creating a new user.
   * @returns The newly created user.
   */
  @Post()
  create(@Body() createUserDto: CreateUserDataDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Finds all users.
   * @returns All users.
   */
  @UseGuards(AuthAdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Finds a user by ID.
   * @param id The ID of the user to find.
   * @returns The user with the specified ID.
   */
  @UseGuards(AuthAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  /**
   * Updates a user by ID.
   * @param id The ID of the user to update.
   * @param updateUserDto The data to update the user with.
   * @returns The updated user.
   */
  @UseGuards(AuthAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  /**
   * Deletes a user by ID.
   * @param id The ID of the user to delete.
   * @returns The deleted user.
   */
  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
