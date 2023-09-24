import { PrismaService } from 'src/database/prisma.service';
import { ProcessRepository, ReturnProcess } from '../process.repository';
import { Process } from '@prisma/client';

export class PrismaProcessRepository implements ProcessRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createProcess(data: any): Promise<ReturnProcess> {
    return await this.prisma.process.create({
      data,
      select: {
        id: true,
        name: true,
      },
    });
  }
  async findAllProcesses(): Promise<Process[]> {
    return await this.prisma.process.findMany();
  }

  async findProcessById(id: number): Promise<Process> {
    return await this.prisma.process.findUnique({
      where: { id },
    });
  }

  async findAllProcessesByAreaId(area_id: number): Promise<Process[]> {
    return await this.prisma.process.findMany({
      where: { area_id },
    });
  }

  async findProcessByName(name: string): Promise<Process> {
    return await this.prisma.process.findUnique({
      where: { name },
    });
  }

  async updateProcess(updateProcessDto: any, id: number): Promise<Process> {
    return await this.prisma.process.update({
      where: { id },
      data: updateProcessDto,
    });
  }

  async deleteProcess(id: number): Promise<Process> {
    return await this.prisma.process.delete({
      where: { id },
    });
  }
}
