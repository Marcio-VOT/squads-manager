import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../user.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly prisma: PrismaService) { }

  async createUser(data: CreateUserDto) {
    return await this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        cpf: true,
        team_id: true,
      },
    });
  }

  async findUserByCPF(cpf: string) {
    return await this.prisma.user.findUnique({
      where: { cpf },
    });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAllUsers() {
    return await this.prisma.user.findMany();
  }

  async deleteUser(id: number) {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async updateUser(data: UpdateUserDto, id: number) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
