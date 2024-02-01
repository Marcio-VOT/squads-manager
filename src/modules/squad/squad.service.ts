import { Injectable, NotFoundException } from '@nestjs/common';
import { SquadRepository } from './repository/squad.repository';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { CreateSquadDto } from './dto/create-squad.dto';

@Injectable()
export class SquadService {
  constructor(private readonly squadRepository: SquadRepository) {}

  async create(data: CreateSquadDto) {
    return await this.squadRepository.createSquad(data);
  }
  // rever

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
