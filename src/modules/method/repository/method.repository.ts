import { Method } from '@prisma/client';
import { CreateMethodDto } from '../dto/create-method.dto';
import { UpdateMethodDto } from '../dto/update-method.dto';

export type ReturnMethodDto = Pick<
  Method,
  'id' | 'name' | 'description' | 'subProcess_id'
>;

export abstract class MethodRepository {
  abstract createMethod(data: CreateMethodDto): Promise<ReturnMethodDto>;
  abstract getMethodByNameAndSubProcessId(
    name: string,
    subProcess_id: number,
  ): Promise<Method>;
  abstract getMethods(): Promise<ReturnMethodDto[]>;
  abstract getMethodById(id: number): Promise<ReturnMethodDto>;
  abstract getMethodBySubProcessId(id: number): Promise<ReturnMethodDto[]>;
  abstract updateMethod(id: number, data: UpdateMethodDto): Promise<Method>;
  abstract deleteMethod(id: number): Promise<Method>;
  abstract linkStackToMethod(
    method_id: number,
    stack_id: number,
  ): Promise<void>;
}
