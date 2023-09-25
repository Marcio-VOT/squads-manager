import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateMethodDto } from './create-method.dto';

export class UpdateMethodDto extends PartialType(
  OmitType(CreateMethodDto, ['subProcess_id']),
) {}
