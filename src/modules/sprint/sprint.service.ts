import { Injectable, NotFoundException } from '@nestjs/common';
import { SprintRepository } from './repository/sprint.repository';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Injectable()
export class SprintService {
  constructor(private readonly sprintRepository: SprintRepository) {}

  async create(data: CreateSprintDto) {
    return await this.sprintRepository.createSprint(data);
  }
  // rever

  async findOne(sprint_id: number) {
    const sprint = await this.sprintRepository.findSprintById(sprint_id);
    if (!sprint) {
      throw new NotFoundException('Sprint not found');
    }
    return sprint;
  }

  async findAll() {
    return await this.sprintRepository.findAllSprint();
  }

  async findaLLMemberByProductId(product_id: number) {
    return await this.sprintRepository.findaLLSprintByProductId(product_id);
  }

  async findaLLMemberBySquadId(squad_id: number) {
    return await this.sprintRepository.findaLLSprintBySquadId(squad_id);
  }

  async remove(sprint_id: number) {
    const sprint = await this.sprintRepository.findSprintById(sprint_id);
    if (!sprint) {
      throw new NotFoundException('Sprint not found');
    }
    return await this.sprintRepository.deleteSprint(sprint_id);
  }

  async update(sprint_id: number, updateSquadDto: UpdateSprintDto) {
    const sprint = await this.sprintRepository.findSprintById(sprint_id);
    if (!sprint) {
      throw new NotFoundException('Sprint not found');
    }

    return await this.sprintRepository.updateSprint(updateSquadDto, sprint_id);
  }
}
