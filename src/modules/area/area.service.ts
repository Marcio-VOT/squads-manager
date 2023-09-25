import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AreaRepository } from './repository/area.repository';

@Injectable()
export class AreaService {
  constructor(private readonly areaRepository: AreaRepository) {}

  async create(createAreaDto: CreateAreaDto) {
    const area = await this.areaRepository.findAreaByName(createAreaDto.name);
    if (area) throw new ConflictException('Area already exists');

    return this.areaRepository.createArea(createAreaDto);
  }

  async findAll() {
    return this.areaRepository.findAllAreas();
  }

  async findAreaAndAllDataById() {
    const data = await this.areaRepository.findAreaAndAllDataById();
    if (!data) throw new NotFoundException('Area not found');
    return data;
  }

  async findOne(id: number) {
    const area = await this.areaRepository.findAreaById(id);
    if (!area) throw new NotFoundException('Area not found');

    return area;
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    const area = this.areaRepository.findAreaById(id);
    if (!area) throw new NotFoundException('Area not found');

    return this.areaRepository.updateArea(updateAreaDto, id);
  }

  async remove(id: number) {
    const area = this.areaRepository.findAreaById(id);
    if (!area) throw new NotFoundException('Area not found');

    return this.areaRepository.deleteArea(id);
  }
}
