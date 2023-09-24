import { SubProcess, User } from '@prisma/client';
import { CreateSubprocessDto } from '../dto/create-subprocess.dto';
import { UpdateSubprocessDto } from '../dto/update-subprocess.dto';

export type ReturnSubprocess = Omit<SubProcess, 'createdAt' | 'updatedAt'>;

export abstract class SubprocessRepository {
  abstract getSubprocesses(): Promise<SubProcess[]>;
  abstract getSubprocessById(id: number): Promise<SubProcess>;
  abstract createSubprocess(
    subprocess: CreateSubprocessDto,
    user: User,
  ): Promise<ReturnSubprocess>;
  abstract updateSubprocess(
    id: number,
    subprocess: UpdateSubprocessDto,
  ): Promise<SubProcess>;
  abstract deleteSubprocess(id: number): Promise<SubProcess>;
  abstract getSubprocessesByProcessId(
    process_id: number,
  ): Promise<SubProcess[]>;
}
