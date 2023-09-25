import { Area, Process, Stack, SubProcess } from '@prisma/client';
import { CreateAreaDto } from '../dto/create-area.dto';
import { UpdateAreaDto } from '../dto/update-area.dto';

export type ReturnCreateArea = Pick<Area, 'id' | 'name'>;

export type AreaWithAllData = Pick<Area, 'id' | 'name'> & {
  _count: {
    Process: number;
  };
  Process: (Pick<Process, 'id' | 'name'> & {
    _count: {
      Stack: number;
      SubProcess: number;
    };
    id: number;
    name: string;
    Stack: Pick<Stack, 'id' | 'name'>[];
    SubProcess: (Pick<SubProcess, 'id' | 'name' | 'description' | 'team_id'> & {
      _count: {
        Method: number;
      };
    })[];
  })[];
};

export abstract class AreaRepository {
  abstract createArea(data: CreateAreaDto): Promise<ReturnCreateArea>;
  abstract findAreaByName(name: string): Promise<Area>;
  abstract findAreaById(id: number): Promise<Area>;
  abstract findAllAreas(): Promise<Area[]>;
  abstract deleteArea(id: number): Promise<void>;
  abstract updateArea(data: UpdateAreaDto, id: number): Promise<Area>;
  abstract findAreaAndAllDataById(): Promise<AreaWithAllData[]>;
  abstract linkProcessToArea(
    area_id: number,
    process_id: number,
  ): Promise<void>;
}
