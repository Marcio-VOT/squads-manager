import { Injectable } from '@nestjs/common';
import {
  ReturnSubprocess,
  SubprocessRepository,
} from '../subprocess.repository';
import { SubProcess, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSubprocessDto } from '../../dto/create-subprocess.dto';
import { UpdateSubprocessDto } from '../../dto/update-subprocess.dto';

@Injectable()
export class PrismaSubprocessRepository implements SubprocessRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getSubprocesses(): Promise<SubProcess[]> {
    return await this.prisma.subProcess.findMany();
  }

  async getSubprocessById(id: number): Promise<SubProcess> {
    return await this.prisma.subProcess.findUnique({
      where: { id },
    });
  }

  async createSubprocess(
    subprocess: CreateSubprocessDto,
    user: User,
  ): Promise<ReturnSubprocess> {
    return await this.prisma.subProcess.create({
      data: {
        ...subprocess,
        team_id: user.team_id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        order: true,
        team_id: true,
        process_id: true,
      },
    });
  }

  async updateSubprocess(
    id: number,
    subprocess: UpdateSubprocessDto,
  ): Promise<SubProcess> {
    return await this.prisma.subProcess.update({
      where: { id },
      data: subprocess,
    });
  }

  async deleteSubprocess(id: number): Promise<SubProcess> {
    return await this.prisma.subProcess.delete({
      where: { id },
    });
  }

  async getSubprocessesByProcessId(process_id: number): Promise<SubProcess[]> {
    return await this.prisma.subProcess.findMany({
      where: { process_id },
    });
  }
}
