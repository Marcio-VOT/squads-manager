import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSprintDto } from '../../dto/create-sprint.dto';
import { UpdateSprintDto } from '../../dto/update-sprint.dto';
import { SprintRepository } from '../sprint.repository';

@Injectable()
export class PrismaSprintRepository implements SprintRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSprint(data: CreateSprintDto) {
    return await this.prisma.sprint.create({
      data: {
        ...data,
        start_date: new Date(data.start_date),
        end_date: data.end_date ? new Date(data.end_date) : undefined,
      },
    });
  }

  async findSprintById(sprint_id: number) {
    return await this.prisma.sprint.findUnique({
      where: { sprint_id },
    });
  }

  async findAllSprint() {
    return await this.prisma.sprint.findMany({
      orderBy: {
        sprint_id: 'asc',
      },
    });
  }

  async findaLLSprintByProductId(product_id: number) {
    return await this.prisma.sprint.findMany({
      where: { Squad: { product_id } },
    });
  }

  async findaLLSprintBySquadId(squad_id: number) {
    return await this.prisma.sprint.findMany({
      where: { squad_id },
    });
  }

  async deleteSprint(sprint_id: number) {
    await this.prisma.sprint.delete({
      where: { sprint_id },
    });
  }

  async updateSprint(data: UpdateSprintDto, sprint_id: number) {
    return await this.prisma.sprint.update({
      where: { sprint_id },
      data: {
        ...data,
        start_date: data.start_date ? new Date(data.start_date) : undefined,
        end_date: data.end_date ? new Date(data.end_date) : undefined,
      },
    });
  }
}
