import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../product/product.service';
import { PrismaUserRepository } from '../product/repository/implementations/prismaProduct.repository';
import { UserRepository } from '../product/repository/product.repository';
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
