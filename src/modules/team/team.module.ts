import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaTeamRepository } from './repository/implementations/prismaTeam.repository';
import { TeamRepository } from './repository/team.repository';

@Module({
  imports: [AuthModule],
  controllers: [TeamController],
  providers: [
    TeamService,
    { provide: TeamRepository, useClass: PrismaTeamRepository },
  ],
  exports: [
    TeamService,
    { provide: TeamRepository, useClass: PrismaTeamRepository },
  ],
})
export class TeamModule {}
