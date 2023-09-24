import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly userRepository: UserRepository) { }
  async create(data: CreateUserDto) {
    const user = await this.userRepository.findUserByCPF(data.cpf);
    if (user) throw new ConflictException('User already exists');

    const hashedPassword = bcrypt.hashSync(data.password, 10);
    // const team = await this.teamRepository.findTeamByName(data.team);
    // if (!team) {
    //   throw new Error('Team does not exists');
    // }
    const userCreated = await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
      // team_id: team.id ?? 0,
      team_id: 0,
    });
    return userCreated;
  }

  async findAll() {
    return await this.userRepository.findAllUsers();
  }

  async findOne(id: number) {
    return await this.userRepository.findUserById(id);
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
