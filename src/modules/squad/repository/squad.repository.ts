import { Squad } from '@prisma/client';
import { UpdateSquadDto } from '../dto/update-squad.dto';
import { CreateSquadDto } from '../dto/create-squad.dto';

export abstract class SquadRepository {
  abstract createSquad(data: CreateSquadDto): Promise<Squad>;
  abstract findSquadById(squad_id: number): Promise<Squad>;
  abstract findAllSquads(): Promise<Squad[]>;
  abstract findaLLSquadsByProductId(product_id: number): Promise<Squad[]>;
  abstract deleteSquad(squad_id: number): Promise<void>;
  abstract updateSquad(data: UpdateSquadDto, squad_id: number): Promise<Squad>;
}
