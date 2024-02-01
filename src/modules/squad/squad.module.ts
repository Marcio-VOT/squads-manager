import { Module } from '@nestjs/common';
import { SquadController } from './squad.controller';
import { PrismaSquadRepository } from './repository/implementations/prismaSquad.repository';
import { SquadRepository } from './repository/squad.repository';
import { SquadService } from './squad.service';
import { MemberService } from '../member/member.service';
import { PrismaMemberRepository } from '../member/repository/implementations/prismaMember.repository';
import { MemberRepository } from '../member/repository/member.repository';

@Module({
  controllers: [SquadController],
  providers: [
    SquadService,
    { provide: SquadRepository, useClass: PrismaSquadRepository },
    MemberService,
    { provide: MemberRepository, useClass: PrismaMemberRepository },
  ],
})
export class SquadModule {}
