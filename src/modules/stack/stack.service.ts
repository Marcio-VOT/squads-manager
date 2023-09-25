import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { User } from '@prisma/client';
import { StackRepository } from './repository/stack.repository';
import { ProcessService } from '../process/process.service';
import { MethodService } from '../method/method.service';
import { SubprocessService } from '../subprocess/subprocess.service';

@Injectable()
export class StackService {
  constructor(
    private readonly stackRepository: StackRepository,
    private readonly processService: ProcessService,
    private readonly methodService: MethodService,
    private readonly subProcessService: SubprocessService,
  ) {}

  async create(data: CreateStackDto, user: User) {
    const process = await this.processService.findOne(data.process_id);
    if (!process) throw new NotFoundException('Process not found');

    const method = await this.methodService.findOne(data.method_id);
    if (!method) throw new NotFoundException('Method not found');

    const subprocess = await this.subProcessService.findOne(
      method.subProcess_id,
    );
    if (!subprocess) throw new NotFoundException('Subprocess not found');

    if (user.team_id !== subprocess.team_id)
      throw new ForbiddenException(
        `This method does not belong to the given team`,
      );

    if (process.id !== subprocess.process_id)
      throw new ForbiddenException(
        'This method does not belong to the given process',
      );

    let stack = await this.stackRepository.getStackByName(data.name);

    if (!stack) stack = await this.stackRepository.createStack(data);

    await this.stackRepository.linkStackToMethodAndProcess(
      stack.id,
      method.id,
      process.id,
    );

    return stack;
  }

  async findAll() {
    return await this.stackRepository.getStacks();
  }

  async findOne(id: number) {
    const stack = await this.stackRepository.getStackById(id);
    if (!stack) throw new NotFoundException('Stack not found');

    return stack;
  }

  async update(id: number, data: UpdateStackDto) {
    const stack = await this.stackRepository.getStackById(id);
    if (!stack) throw new NotFoundException('Stack not found');

    return await this.stackRepository.updateStack(id, data);
  }

  async remove(id: number) {
    const stack = await this.stackRepository.getStackById(id);
    if (!stack) throw new NotFoundException('Stack not found');

    return await this.stackRepository.deleteStack(id);
  }
}
