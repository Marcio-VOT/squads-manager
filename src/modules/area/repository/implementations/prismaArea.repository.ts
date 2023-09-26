import { Injectable } from '@nestjs/common';
import { AreaRepository, AreaWithAllData } from '../area.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAreaDto } from '../../dto/create-area.dto';
import { UpdateAreaDto } from '../../dto/update-area.dto';

@Injectable()
export class PrismaAreaRepository implements AreaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createArea(data: CreateAreaDto) {
    return await this.prisma.area.create({
      data,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findAreaAndAllDataById(): Promise<AreaWithAllData[]> {
    return await this.prisma.area.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            Process: true,
          },
        },

        Process: {
          select: {
            _count: {
              select: {
                Stack: true,
                SubProcess: true,
              },
            },
            id: true,
            name: true,
            Stack: {
              select: {
                id: true,
                name: true,
              },
            },
            SubProcess: {
              select: {
                id: true,
                name: true,
                description: true,
                team_id: true,
                Team: {
                  select: {
                    name: true,
                  },
                },

                _count: {
                  select: {
                    Method: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findAreaByName(name: string) {
    return await this.prisma.area.findUnique({
      where: { name },
    });
  }

  async findAreaById(id: number) {
    return await this.prisma.area.findUnique({
      where: { id },
    });
  }

  async findAllAreas() {
    return await this.prisma.area.findMany();
  }

  async deleteArea(id: number) {
    await this.prisma.area.delete({
      where: { id },
    });
  }

  async updateArea(data: UpdateAreaDto, id: number) {
    return await this.prisma.area.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async linkProcessToArea(area_id: number, process_id: number) {
    await this.prisma.area.update({
      where: { id: area_id },
      data: {
        Process: {
          connect: {
            id: process_id,
          },
        },
      },
    });
  }
}
