import { Stack } from '@prisma/client';
import { CreateStackDto } from '../dto/create-stack.dto';
import { UpdateStackDto } from '../dto/update-stack.dto';

export abstract class StackRepository {
  abstract createStack(data: CreateStackDto): Promise<Stack>;
  abstract getStacks(): Promise<Stack[]>;
  abstract linkStackToMethodAndProcess(
    stack_id: number,
    method_id: number,
    process_id: number,
  ): Promise<void>;
  abstract getStackById(id: number): Promise<Stack>;
  abstract getStackByName(name: string): Promise<Stack>;
  abstract getStackByMethodId(id: number): Promise<Stack[]>;
  abstract getStackByProcessId(id: number): Promise<Stack[]>;
  abstract updateStack(id: number, data: UpdateStackDto): Promise<Stack>;
  abstract deleteStack(id: number): Promise<void>;
}
