import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMemberDto } from './dto/update-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { MemberRepository } from './repository/member.repository';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async create(data: CreateMemberDto) {
    return await this.memberRepository.createMember(data);
  }
  // rever

  async findOne(member_id: number) {
    const member = await this.memberRepository.findMemberById(member_id);
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }

  async findAll() {
    return await this.memberRepository.findAllMember();
  }

  async findaLLMemberByProductId(product_id: number) {
    return await this.memberRepository.findaLLMemberByProductId(product_id);
  }

  async findaLLMemberBySquadId(squad_id: number) {
    return await this.memberRepository.findaLLMemberBySquadId(squad_id);
  }

  async remove(member_id: number) {
    const member = await this.memberRepository.findMemberById(member_id);
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return await this.memberRepository.deleteMember(member_id);
  }

  async update(squad_id: number, updateSquadDto: UpdateMemberDto) {
    const member = await this.memberRepository.findMemberById(squad_id);
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return await this.memberRepository.updateMember(updateSquadDto, squad_id);
  }
}
