import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from '../../dto/create-member.dto';
import { UpdateMemberDto } from '../../dto/update-member.dto';
import { MemberRepository } from '../member.repository';

@Injectable()
export class PrismaMemberRepository implements MemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMember(data: CreateMemberDto) {
    return await this.prisma.squadMember.create({
      data,
    });
  }

  async findMemberById(member_id: number) {
    return await this.prisma.squadMember.findUnique({
      where: { member_id },
    });
  }

  async findAllMember() {
    return await this.prisma.squadMember.findMany({
      orderBy: {
        member_id: 'asc',
      },
    });
  }

  async findaLLMemberByProductId(product_id: number) {
    return await this.prisma.squadMember.findMany({
      where: { Squad: { product_id } },
    });
  }

  async findaLLMemberBySquadId(squad_id: number) {
    return await this.prisma.squadMember.findMany({
      where: { current_squad_id: squad_id },
    });
  }

  async deleteMember(member_id: number) {
    await this.prisma.squadMember.delete({
      where: { member_id },
    });
  }

  async updateMember(data: UpdateMemberDto, member_id: number) {
    return await this.prisma.squadMember.update({
      where: { member_id },
      data,
    });
  }
}
