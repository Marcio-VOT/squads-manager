import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaUserRepository } from '../user/repository/implementations/prismaUser.repository';
import { UserRepository } from '../user/repository/user.repository';
import { TeamRepository } from '../team/repository/team.repository';
import { TeamService } from '../team/team.service';
import { AuthAdminService } from './authAdmin.service';
import { PrismaTeamRepository } from '../team/repository/implementations/prismaTeam.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthAdminService,
    UserService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    TeamService,
    { provide: TeamRepository, useClass: PrismaTeamRepository },
  ],
  exports: [AuthService, AuthAdminService],
})
export class AuthModule {}
