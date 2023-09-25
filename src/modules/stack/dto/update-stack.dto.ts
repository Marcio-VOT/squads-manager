import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateStackDto } from './create-stack.dto';

export class UpdateStackDto extends PartialType(
  OmitType(CreateStackDto, ['method_id', 'process_id']),
) {}
