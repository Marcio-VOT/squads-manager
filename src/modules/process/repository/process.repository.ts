import { Process } from '@prisma/client';
import { CreateProcessDto } from '../dto/create-process.dto';
import { UpdateProcessDto } from '../dto/update-process.dto';

export type ReturnProcess = Pick<Process, 'id' | 'name'>;

export abstract class ProcessRepository {
  abstract createProcess(
    createProcessDto: CreateProcessDto,
  ): Promise<ReturnProcess>;
  abstract findAllProcesses(): Promise<Process[]>;
  abstract findProcessById(id: number): Promise<Process>;
  abstract findAllProcessesByAreaId(area_id: number): Promise<Process[]>;
  abstract findProcessesByName(name: string): Promise<Process[]>;
  abstract findProcessByNameAndAreaId(
    name: string,
    area_id: number,
  ): Promise<Process>;
  abstract updateProcess(
    updateProcessDto: UpdateProcessDto,
    id: number,
  ): Promise<ReturnProcess>;
  abstract deleteProcess(id: number): Promise<Process>;
  abstract linkSubprocessToProcess(
    subprocess_id: number,
    process_id: number,
  ): Promise<void>;
}
