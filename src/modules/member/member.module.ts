import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { PrismaMemberRepository } from './repository/implementations/prismaMember.repository';
import { MemberRepository } from './repository/member.repository';
import { MemberService } from './member.service';
import { PrismaSquadRepository } from '../squad/repository/implementations/prismaSquad.repository';
import { SquadRepository } from '../squad/repository/squad.repository';
import { SquadService } from '../squad/squad.service';

@Module({
  controllers: [MemberController],
  providers: [
    MemberService,
    { provide: MemberRepository, useClass: PrismaMemberRepository },
    SquadService,
    { provide: SquadRepository, useClass: PrismaSquadRepository },
  ],
})
export class MemberModule {}
