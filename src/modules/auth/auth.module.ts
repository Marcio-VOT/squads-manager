import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaUserRepository } from '../user/repository/implementations/prismaUser.repository';
import { UserRepository } from '../user/repository/user.repository';
import { TeamRepository } from '../team/repository/team.repository';
import { TeamService } from '../team/team.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    TeamService,
    { provide: TeamRepository, useClass: PrismaUserRepository },
  ],
  exports: [AuthService, UserService],
})
//eslint-disable-next-line
export class AuthModule { }
