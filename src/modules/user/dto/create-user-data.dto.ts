import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDataDto extends OmitType(CreateUserDto, [
  'team_id' as const,
]) {
  @IsString()
  @IsNotEmpty()
  @Length(1, 80)
  team: string;
}
