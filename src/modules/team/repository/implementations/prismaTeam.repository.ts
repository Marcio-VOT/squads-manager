import { Injectable } from '@nestjs/common';
import { TeamRepository } from '../team.repository';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaTeamRepository implements TeamRepository {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly prisma: PrismaService) { }

  async createTeam(data: any) {
    return await this.prisma.team.create({
      data,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findTeamByName(name: string) {
    return await this.prisma.team.findUnique({
      where: { name },
    });
  }

  async findTeamById(id: number) {
    return await this.prisma.team.findUnique({
      where: { id },
    });
  }

  async findAllTeams() {
    return await this.prisma.team.findMany();
  }

  async deleteTeam(id: number) {
    await this.prisma.team.delete({
      where: { id },
    });
  }

  async updateTeam(data: any) {
    return await this.prisma.team.update({
      where: { id: data.id },
      data,
    });
  }
}
