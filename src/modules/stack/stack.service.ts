import { Injectable } from '@nestjs/common';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';

@Injectable()
export class StackService {
  create(createStackDto: CreateStackDto) {
    return 'This action adds a new stack';
  }

  findAll() {
    return `This action returns all stack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stack`;
  }

  update(id: number, updateStackDto: UpdateStackDto) {
    return `This action updates a #${id} stack`;
  }

  remove(id: number) {
    return `This action removes a #${id} stack`;
  }
}
