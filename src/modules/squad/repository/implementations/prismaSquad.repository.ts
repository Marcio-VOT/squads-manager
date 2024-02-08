import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { SquadRepository } from '../squad.repository';
import { UpdateSquadDto } from '../../dto/update-squad.dto';
import { CreateSquadDto } from '../../dto/create-squad.dto';

@Injectable()
export class PrismaSquadRepository implements SquadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSquad(data: CreateSquadDto) {
    return await this.prisma.todo.create({
      data,
    });
  }

  async findSquadById(todo_id: number) {
    return await this.prisma.todo.findUnique({
      where: { todo_id, deleted_at: null },
    });
  }

  async findAllSquads() {
    return await this.prisma.todo.findMany({
      where: { deleted_at: null },
      orderBy: {
        todo_id: 'asc',
      },
    });
  }

  async deleteSquad(todo_id: number) {
    await this.prisma.todo.update({
      where: { todo_id },
      data: { deleted_at: new Date() },
    });
  }

  async updateSquad(data: UpdateSquadDto, todo_id: number) {
    return await this.prisma.todo.update({
      where: { todo_id },
      data: { ...data },
    });
  }
}
