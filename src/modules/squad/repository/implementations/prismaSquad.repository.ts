import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { SquadRepository } from '../squad.repository';
import { UpdateSquadDto } from '../../dto/update-squad.dto';
import { CreateSquadDto } from '../../dto/create-squad.dto';

@Injectable()
export class PrismaSquadRepository implements SquadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSquad(data: CreateSquadDto) {
    return await this.prisma.squad.create({
      data,
    });
  }

  async findSquadById(squad_id: number) {
    return await this.prisma.squad.findUnique({
      where: { squad_id },
    });
  }

  async findAllSquads() {
    return await this.prisma.squad.findMany({
      orderBy: {
        product_id: 'asc',
      },
    });
  }

  async findaLLSquadsByProductId(product_id: number) {
    return await this.prisma.squad.findMany({
      where: { product_id },
    });
  }

  async deleteSquad(squad_id: number) {
    await this.prisma.squad.delete({
      where: { squad_id },
    });
  }

  async updateSquad(data: UpdateSquadDto, squad_id: number) {
    return await this.prisma.squad.update({
      where: { squad_id },
      data,
    });
  }
}
