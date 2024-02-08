import { PartialType } from '@nestjs/mapped-types';
import { CreateSquadDto } from './create-squad.dto';
import { IsOptional } from 'class-validator';

export class UpdateSquadDto extends PartialType(CreateSquadDto) {
  @IsOptional()
  deleted_at: Date;
}
