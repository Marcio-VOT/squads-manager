import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from './repository/implementations/prismaUser.repository';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from '../auth/auth.module';
import { TeamService } from '../team/team.service';
import { TeamRepository } from '../team/repository/team.repository';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    TeamService,
    { provide: TeamRepository, useClass: PrismaUserRepository },
  ],
  exports: [
    UserService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
})
// eslint-disable-next-line
export class UserModule { }
