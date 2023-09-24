import { Area } from '@prisma/client';
import { CreateAreaDto } from '../dto/create-area.dto';
import { UpdateAreaDto } from '../dto/update-area.dto';

export type ReturnCreateArea = Pick<Area, 'id' | 'name'>;

export abstract class AreaRepository {
  abstract createArea(data: CreateAreaDto): Promise<ReturnCreateArea>;
  abstract findAreaByName(name: string): Promise<Area>;
  abstract findAreaById(id: number): Promise<Area>;
  abstract findAllAreas(): Promise<Area[]>;
  abstract deleteArea(id: number): Promise<void>;
  abstract updateArea(data: UpdateAreaDto, id: number): Promise<Area>;
  abstract linkProcessToArea(
    area_id: number,
    process_id: number,
  ): Promise<void>;
}
