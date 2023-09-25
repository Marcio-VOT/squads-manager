import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { MethodRepository } from './repository/method.repository';
import { SubprocessService } from '../subprocess/subprocess.service';

@Injectable()
export class MethodService {
  constructor(
    private readonly methodRepository: MethodRepository,
    private readonly subprocessService: SubprocessService,
  ) {}
  async create(createMethodDto: CreateMethodDto, team_id: number) {
    const subprocess = await this.subprocessService.findOne(
      createMethodDto.subProcess_id,
    );

    if (!subprocess)
      throw new NotFoundException('This subprocess does not exist');

    if (subprocess.team_id !== team_id)
      throw new ConflictException(
        'This subprocess does not belong to the team you are in',
      );

    const method = await this.methodRepository.getMethodByNameAndSubProcessId(
      createMethodDto.name,
      createMethodDto.subProcess_id,
    );

    if (method)
      throw new ConflictException('This method already exists in this process');

    return await this.methodRepository.createMethod(createMethodDto);
  }

  async findAll() {
    return await this.methodRepository.getMethods();
  }

  async findAllBySubProcessId(id: number) {
    const subprocess = await this.subprocessService.findOne(id);
    if (!subprocess)
      throw new NotFoundException('This subprocess does not exist');

    return await this.methodRepository.getMethodBySubProcessId(id);
  }

  async findOne(id: number) {
    const method = await this.methodRepository.getMethodById(id);
    if (!method) throw new NotFoundException('This method does not exist');

    return method;
  }

  async update(id: number, updateMethodDto: UpdateMethodDto) {
    const method = await this.methodRepository.getMethodById(id);
    if (!method) throw new NotFoundException('This method does not exist');

    return await this.methodRepository.updateMethod(id, updateMethodDto);
  }

  async remove(id: number) {
    const method = await this.methodRepository.getMethodById(id);
    if (!method) throw new NotFoundException('This method does not exist');

    return await this.methodRepository.deleteMethod(id);
  }
}
