import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export type ReturnCreateUser = Pick<User, 'id' | 'name' | 'team_id' | 'cpf'>;

export abstract class UserRepository {
  abstract createUser(data: CreateUserDto): Promise<ReturnCreateUser>;
  abstract findUserByCPF(CPF: string): Promise<User>;
  abstract findUserById(id: number): Promise<User>;
  abstract findAllUsers(): Promise<User[]>;
  abstract deleteUser(id: number): Promise<void>;
  abstract updateUser(data: UpdateUserDto, id: number): Promise<User>;
}
