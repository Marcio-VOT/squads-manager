import { Sprint } from '@prisma/client';
import { UpdateSprintDto } from '../dto/update-sprint.dto';
import { CreateSprintDto } from '../dto/create-sprint.dto';

export abstract class SprintRepository {
  abstract createSprint(data: CreateSprintDto): Promise<Sprint>;
  abstract findSprintById(sprint_id: number): Promise<Sprint>;
  abstract findAllSprint(): Promise<Sprint[]>;
  abstract findaLLSprintByProductId(product_id: number): Promise<Sprint[]>;
  abstract findaLLSprintBySquadId(squad_id: number): Promise<Sprint[]>;
  abstract deleteSprint(sprint_id: number): Promise<void>;
  abstract updateSprint(
    data: UpdateSprintDto,
    sprint_id: number,
  ): Promise<Sprint>;
}
