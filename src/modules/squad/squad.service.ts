import { Injectable, NotFoundException } from '@nestjs/common';
import { SquadRepository } from './repository/squad.repository';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { CreateSquadDto } from './dto/create-squad.dto';
import { MemberService } from '../member/member.service';

@Injectable()
export class SquadService {
  constructor(
    private readonly squadRepository: SquadRepository,
    private readonly memberService: MemberService,
  ) {}

  async create(data: CreateSquadDto) {
    await Promise.all(
      [data.leader_id, data.product_owner_id, data.scrum_master_id].map(
        async (id) => {
          if (id) await this.memberService.findOne(id);
        },
      ),
    );
    return await this.squadRepository.createSquad(data);
  }

  async findAll() {
    return await this.squadRepository.findAllSquads();
  }

  async findaLLSquadsByProductId(product_id: number) {
    return await this.squadRepository.findaLLSquadsByProductId(product_id);
  }

  async findOne(squad_id: number) {
    const squad = await this.squadRepository.findSquadById(squad_id);
    if (!squad) {
      throw new NotFoundException('Squad not found');
    }
    return squad;
  }

  async update(squad_id: number, updateSquadDto: UpdateSquadDto) {
    const squad = await this.squadRepository.findSquadById(squad_id);
    if (!squad) {
      throw new NotFoundException('Squad not found');
    }

    await Promise.all(
      [
        updateSquadDto.leader_id,
        updateSquadDto.product_owner_id,
        updateSquadDto.scrum_master_id,
      ].map(async (id) => {
        if (id) await this.memberService.findOne(id);
      }),
    );

    return await this.squadRepository.updateSquad(updateSquadDto, squad_id);
  }

  async remove(squad_id: number) {
    const squad = await this.squadRepository.findSquadById(squad_id);
    if (!squad) {
      throw new NotFoundException('Squad not found');
    }
    return await this.squadRepository.deleteSquad(squad_id);
  }
}
