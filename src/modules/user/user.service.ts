import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TeamRepository } from '../team/repository/team.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly teamRepository: TeamRepository,
  ) {}
  async create(data: CreateUserDataDto) {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const user = await this.userRepository.findUserByCPF(data.cpf);
    if (user) throw new ConflictException('User already exists');
    console.log(data);
    const team = await this.teamRepository.findTeamByName(data.team);
    let team_id: number = team?.id ?? undefined;
    if (!team) {
      const createdTeam = await this.teamRepository.createTeam({
        name: data.team,
      });
      team_id = createdTeam.id;
    }
    delete data.team;
    const userCreated = await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
      team_id,
    });
    return userCreated;
  }

  async findAll() {
    return await this.userRepository.findAllUsers();
  }

  async findOne(id: number) {
    return await this.userRepository.findUserById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateUser(updateUserDto, id);
  }

  async remove(id: number) {
    return await this.userRepository.deleteUser(id);
  }
}
