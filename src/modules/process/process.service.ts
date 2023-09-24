import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { ProcessRepository } from './repository/process.repository';

@Injectable()
export class ProcessService {
  constructor(private readonly processRepository: ProcessRepository) {}
  async create(data: CreateProcessDto) {
    const process = await this.processRepository.findProcessByName(data.name);
    if (process) throw new ConflictException('Process already exists');
    return await this.processRepository.createProcess(data);
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
