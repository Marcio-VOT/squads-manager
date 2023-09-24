import { Team } from '@prisma/client';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';

export type ReturnCreateTeam = Pick<Team, 'id' | 'name'>;

export abstract class TeamRepository {
  abstract createTeam(data: CreateTeamDto): Promise<ReturnCreateTeam>;
  abstract findTeamByName(name: string): Promise<Team>;
  abstract findTeamById(id: number): Promise<Team>;
  abstract findAllTeams(): Promise<Team[]>;
  abstract deleteTeam(id: number): Promise<void>;
  abstract updateTeam(data: UpdateTeamDto): Promise<Team>;
}
