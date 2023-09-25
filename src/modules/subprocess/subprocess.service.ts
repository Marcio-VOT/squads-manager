import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubprocessDto } from './dto/create-subprocess.dto';
import { UpdateSubprocessDto } from './dto/update-subprocess.dto';
import { SubprocessRepository } from './repository/subprocess.repository';
import { User } from '@prisma/client';
import { ProcessRepository } from '../process/repository/process.repository';

@Injectable()
export class SubprocessService {
  constructor(
    private readonly subprocessRepository: SubprocessRepository,
    private readonly processRepository: ProcessRepository,
  ) {}
  async create(data: CreateSubprocessDto, user: User) {
    const process = await this.processRepository.findProcessById(
      data.process_id,
    );
    if (!process) throw new NotFoundException('Process not found');

    const subprocess =
      await this.subprocessRepository.getSubprocessByNameTeamIdAndProcessId(
        data.name,
        user.team_id,
        data.process_id,
      );
    if (subprocess) throw new ConflictException('Subprocess already exists');

    const subprocessCreated = await this.subprocessRepository.createSubprocess(
      data,
      user,
    );
    await this.processRepository.linkSubprocessToProcess(
      subprocessCreated.id,
      process.id,
    );

    return subprocessCreated;
  }

  async findAll() {
    return await this.subprocessRepository.getSubprocesses();
  }

  async findOne(id: number) {
    const subprocess = await this.subprocessRepository.getSubprocessById(id);
    if (!subprocess) throw new NotFoundException('Subprocess not found');

    return subprocess;
  }

  async update(id: number, updateSubprocessDto: UpdateSubprocessDto) {
    const subprocess = await this.subprocessRepository.getSubprocessById(id);
    if (!subprocess) throw new NotFoundException('Subprocess not found');

    return await this.subprocessRepository.updateSubprocess(
      id,
      updateSubprocessDto,
    );
  }

  async remove(id: number) {
    const subprocess = await this.subprocessRepository.getSubprocessById(id);
    if (!subprocess) throw new NotFoundException('Subprocess not found');

    return await this.subprocessRepository.deleteSubprocess(id);
  }
}
