import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

// eslint-disable-next-line prettier/prettier
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
