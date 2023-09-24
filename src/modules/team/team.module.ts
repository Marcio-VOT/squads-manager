import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaTeamRepository } from './repository/implementations/prismaTeam.repository';

@Module({
  imports: [AuthModule],
  controllers: [TeamController],
  providers: [
    TeamService,
    { provide: TeamService, useClass: PrismaTeamRepository },
  ],
  exports: [
    TeamService,
    { provide: TeamService, useClass: PrismaTeamRepository },
  ],
})
//eslint-disable-next-line
export class TeamModule { }
