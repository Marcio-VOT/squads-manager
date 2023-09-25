import { Method } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMethodDto } from '../../dto/create-method.dto';
import { MethodRepository, ReturnMethodDto } from '../method.repository';
import { UpdateMethodDto } from '../../dto/update-method.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaMethodRepository implements MethodRepository {
  constructor(private readonly prisma: PrismaService) {}

  select = {
    id: true,
    name: true,
    description: true,
    subProcess_id: true,
  };

  async createMethod(data: CreateMethodDto): Promise<ReturnMethodDto> {
    return await this.prisma.method.create({
      data,
      select: this.select,
    });
  }

  async getMethodByNameAndSubProcessId(
    name: string,
    subProcess_id: number,
  ): Promise<Method> {
    return await this.prisma.method.findUnique({
      where: { name_subProcess_id: { name, subProcess_id } },
    });
  }

  async getMethods(): Promise<ReturnMethodDto[]> {
    return await this.prisma.method.findMany({
      select: this.select,
    });
  }

  async getMethodById(id: number): Promise<ReturnMethodDto> {
    return await this.prisma.method.findUnique({
      where: { id },
      select: this.select,
    });
  }

  async getMethodBySubProcessId(id: number): Promise<ReturnMethodDto[]> {
    return await this.prisma.method.findMany({
      where: { subProcess_id: id },
      select: this.select,
    });
  }

  async updateMethod(id: number, data: UpdateMethodDto): Promise<Method> {
    return await this.prisma.method.update({ where: { id }, data });
  }

  async deleteMethod(id: number): Promise<Method> {
    return await this.prisma.method.delete({ where: { id } });
  }

  async linkStackToMethod(method_id: number, stack_id: number): Promise<void> {
    await this.prisma.method.update({
      where: { id: method_id },
      data: { Stack: { connect: { id: stack_id } } },
    });
  }
}
