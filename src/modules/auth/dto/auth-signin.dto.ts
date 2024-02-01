import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/modules/product/dto/create-user.dto';

export class AuthSignInDto extends OmitType(CreateUserDto, [
  'name',
  'team_id',
] as const) {}
