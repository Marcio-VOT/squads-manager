import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from './repository/implementations/prismaUser.repository';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from '../auth/auth.module';
import { TeamService } from '../team/team.service';
import { TeamRepository } from '../team/repository/team.repository';
import { PrismaTeamRepository } from '../team/repository/implementations/prismaTeam.repository';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    TeamService,
    { provide: TeamRepository, useClass: PrismaTeamRepository },
  ],
  // exports: [
  //   UserService,
  //   { provide: UserRepository, useClass: PrismaUserRepository },
  // ],
})
export class UserModule {}
