import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { ProcessRepository } from './repository/process.repository';
import { AreaRepository } from '../area/repository/area.repository';

@Injectable()
export class ProcessService {
  constructor(
    private readonly processRepository: ProcessRepository,
    private readonly areaRepository: AreaRepository,
  ) {}

  async create(data: CreateProcessDto) {
    const process = await this.processRepository.findProcessByNameAndAreaId(
      data.name,
      data.area_id,
    );
    if (process) throw new ConflictException('Process already exists');

    const area = await this.areaRepository.findAreaById(data.area_id);
    if (!area) throw new NotFoundException('Area not found');
    const processCreated = await this.processRepository.createProcess(data);
    await this.areaRepository.linkProcessToArea(area.id, processCreated.id);
    return processCreated;
  }

  async findAll() {
    return await this.processRepository.findAllProcesses();
  }

  async findOne(id: number) {
    const process = await this.processRepository.findProcessById(id);
    if (!process) throw new NotFoundException('Process not found');
    return process;
  }

  async update(id: number, data: UpdateProcessDto) {
    const process = await this.processRepository.findProcessById(id);
    if (!process) throw new NotFoundException('Process not found');
    return await this.processRepository.updateProcess(data, id);
  }

  async remove(id: number) {
    const process = await this.processRepository.findProcessById(id);
    if (!process) throw new NotFoundException('Process not found');
    return await this.processRepository.deleteProcess(id);
  }
}
