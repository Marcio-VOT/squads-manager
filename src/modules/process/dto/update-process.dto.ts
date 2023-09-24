import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProcessDto } from './create-process.dto';

export class UpdateProcessDto extends OmitType(PartialType(CreateProcessDto), [
  'area_id',
]) {}
