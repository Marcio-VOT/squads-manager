import { Todo } from '@prisma/client';
import { UpdateSquadDto } from '../dto/update-squad.dto';
import { CreateSquadDto } from '../dto/create-squad.dto';

export abstract class SquadRepository {
  abstract createSquad(data: CreateSquadDto): Promise<Todo>;
  abstract findSquadById(squad_id: number): Promise<Todo>;
  abstract findAllSquads(): Promise<Todo[]>;
  abstract deleteSquad(squad_id: number): Promise<void>;
  abstract updateSquad(data: UpdateSquadDto, squad_id: number): Promise<Todo>;
}
