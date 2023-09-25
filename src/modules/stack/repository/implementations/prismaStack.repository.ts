import { Injectable } from '@nestjs/common';
import { StackRepository } from '../stack.repository';
import { Stack } from '@prisma/client';
import { CreateStackDto } from '../../dto/create-stack.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaStackRepository implements StackRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createStack(data: CreateStackDto): Promise<Stack> {
    return await this.prisma.stack.create({ data });
  }

  async getStacks(): Promise<Stack[]> {
    return await this.prisma.stack.findMany();
  }

  async linkStackToMethodAndProcess(
    stack_id: number,
    method_id: number,
    process_id: number,
  ): Promise<void> {
    await this.prisma.stack.update({
      where: { id: stack_id },
      data: {
        Method: { connect: { id: method_id } },
        Process: { connect: { id: process_id } },
      },
    });
  }

  async getStackById(id: number): Promise<Stack> {
    return await this.prisma.stack.findUnique({ where: { id } });
  }

  async getStackByName(name: string): Promise<Stack> {
    return await this.prisma.stack.findUnique({ where: { name } });
  }

  async getStackByMethodId(id: number): Promise<Stack[]> {
    return await this.prisma.stack.findMany({
      where: {
        Method: {
          some: {
            id: id,
          },
        },
      },
    });
  }

  async getStackByProcessId(id: number): Promise<Stack[]> {
    return await this.prisma.stack.findMany({
      where: {
        Process: {
          some: {
            id: id,
          },
        },
      },
    });
  }

  async updateStack(id: number, data: CreateStackDto): Promise<Stack> {
    return await this.prisma.stack.update({ where: { id }, data });
  }

  async deleteStack(id: number): Promise<void> {
    await this.prisma.stack.delete({ where: { id } });
  }
}
